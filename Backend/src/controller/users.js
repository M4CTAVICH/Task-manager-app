import User from "../models/user.js";
import bcrypt from "bcrypt";

export async function getusers(req, res) {
  try {
    const user = await User.find();
    if (!user.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
}
export async function createusers(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate required fields first
    if (!name || !email || !password) {
      return res.status(400).json({ message: "fill all fields please" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Return success but don't include password in response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}
export async function getusersbyid(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user by id", error: error.message });
  }
}
export async function updateuser(req, res) {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "User updated successfully",
      user: userResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
}
export async function deleteuser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "user deleted succefully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
}
