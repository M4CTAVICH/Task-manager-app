import mongoose from "mongoose";
import User from "./src/models/user.js";
import bcrypt, { hash } from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error", err));

async function hashExistingPasswords() {
  try {
    const users = await User.find({
      password: { $not: /^\$2b\$/ },
    });

    console.log(`Found ${users.length} users with unhashed passwords.`);

    for (const user of users) {
      const originalPassword = user.password;
      const hashedPassword = await bcrypt.hash(originalPassword, 10);

      await User.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } }
      );
      console.log(
        `Updated user ${user._id} password from ${originalPassword} to ${hashedPassword}`
      );
    }
  } catch (error) {
    console.error("Error hashing passwords:", error);
  } finally {
    mongoose.disconnect();
  }
}
hashExistingPasswords();
