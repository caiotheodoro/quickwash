import { query as db } from 'faunadb'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { redirect } from 'next/dist/server/api-utils';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;
      try {
        await fauna.query(
          db.If(
            db.Not(
              db.Exists(
                db.Match(
                  db.Index('user_by_email'),
                  db.Casefold(email)
                )
              )
            ),
            db.Create(
              db.Collection('users'),
              { data: { email } }
            ),
            db.Get(
              db.Match(
                db.Index('user_by_email'),
                db.Casefold(email)
              )
            )
          )
        )

        return true;
      } catch {
        return false;
      }
    },
  },

})