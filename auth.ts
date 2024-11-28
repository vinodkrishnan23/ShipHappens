import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getDb } from "@/app/lib/mongo";

declare module "next-auth" {
  interface User {
    is_captain?: boolean;
    _id?: string;
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
    console.log("In the callback line 24");
    const existingUser = await db.collection('customers').findOne({ email: session.user.email });
    console.log("In the callback line 25");
    console.log(existingUser);

    if (existingUser) {
      // Add user details to the session
      session.user.name = existingUser.full_name;
      session.user.email = existingUser.email;
      session.user.is_captain = existingUser.is_captain; // Example of adding a custom field
      session.user._id = existingUser._id.toString(); // Convert ObjectId to string
    }
    return session; // Return the session object
  }
}
,
  trustHost: true,
  secret: process.env.AUTH_SECRET
})