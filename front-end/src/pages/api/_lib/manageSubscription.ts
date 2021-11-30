import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../../services/stripe";

interface Amount {
  data: {
    data: {
      amount: number
    }
  }[]
}

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

  const totalAmount = await fauna.query<Amount>(
    q.Map(
      q.Paginate(
        q.Match(q.Index("subscription_by_user_ref"), userRef),

      ),
      q.Lambda("X", q.Get(q.Var("X")))
    ),
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  let aux = 0
  totalAmount.data.map(item => aux += Number(item.data.amount))

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
    ),
      await fauna.query(
        q.If(
          q.GTE(aux, 149),
          q.Create(
            q.Collection("coupons"),
            { data: { coupon: subscription.id, userId: userRef } }
          ),
          false
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