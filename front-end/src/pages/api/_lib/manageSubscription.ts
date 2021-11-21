import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";
export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  vehicle: string,
  amount: number,
  type: string,
  createdAt: string,
  plate: string,
  observation: string,
  scheduleDate: string,
  coupon: string,
  payment: string,
  vehicleType: string,

) {
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index("user_by_stripe_customer_id"),
          customerId
        )
      )
    )
  )


  const subscription = await stripe.subscriptions.retrieve(subscriptionId)


  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    vehicle: subscription.metadata.vehicle,
    amount: subscription.metadata.amount,
    type: subscription.metadata.type,
    createdAt: subscription.metadata.createdAt,
    plate: subscription.metadata.plate,
    observation: subscription.metadata.observation,
    scheduleDate: subscription.metadata.scheduleDate,
    coupon: subscription.metadata.coupon,
    payment: subscription.metadata.payment,
    vehicleType: subscription.metadata.vehicleType
  }

  if (createAction) {
    await fauna.query(
      q.Create(
        q.Collection("subscriptions"),
        { data: subscriptionData }
      )
    )
  }
  else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index("subscription_by_id"),
              subscriptionId,
            )
          ),
        ),
        { data: subscriptionData }
      )
    )
  }
}