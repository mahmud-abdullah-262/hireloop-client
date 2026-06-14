import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_CONNECTION);
const db = client.db('hireLoop-user');
export const auth = betterAuth({
  rustedOrigins: ["http://localhost:3000"], // এখানে বেজ ইউআরএল বসাতে হবে।
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

 emailAndPassword: { 
    enabled: true, 
  }, 

  user: {
    additionalFields: {
      role: {
        default : 'seeker'
      },
       plan: {
        default : 'seeker_free'
      }
    }
  },
    plugins: [
        admin() 
    ]

});