import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getDb } from "@/app/lib/mongo";

declare module "next-auth" {
  interface User {
    is_captain?: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google(
    {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
  }
)],
callbacks :{
  async session({token, session}) {
    // Check if the user exists in the database
    console.log("In the callback line 21");
    const db = await getDb();
    const existingUser = await db.collection('customers').findOne({ email: session.user.email });

    if (existingUser) {
      // Add user details to the session
      session.user.name = existingUser.name;
      session.user.email = existingUser.email;
      session.user.is_captain = existingUser.is_captain; // Example of adding a custom field
    }
    return session; // Return the session object
  }
}
,
  trustHost: true,
  secret: process.env.AUTH_SECRET
})