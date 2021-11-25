import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/client";
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";

type User = {
    ref: {
        id: string
    }
    data: {
        stripe_customer_id: string
    }
}


interface Get {
    data: {
      data: {
        amount: number;
        vehicle: string;
        type: string,
        createdAt: Date,
        plate: string,
        observation: string,
        scheduleDate: Date,
        payment: string,
      }
    }[]
  }

export default async (req: NextApiRequest, res: NextApiResponse) => {
     if (req.method === 'GET') {

        const session = await getSession({ req });

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index("user_by_email"),
                    q.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id

        if (!customerId) {
            const stripeCustomer = await stripe.customers.create(
                { email: session.user.email }

            );

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection("users"), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                )
            )
            customerId = stripeCustomer.id

        }

        const dados = await fauna.query<Get>(
            q.Map(
                q.Paginate(
                  q.Match(q.Index("coupon_by_user_id"), q.Ref(q.Collection("users"), user.ref.id)),
          
                ),
                q.Lambda("X", q.Get(q.Var("X")))
              ),
        )

            return res.status(200).json({
                dados: dados.data,
            });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end(`Method Not Allowed`);
    }
}