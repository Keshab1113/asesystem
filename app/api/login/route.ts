import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      )
    }

    const users = await executeQuery<any>(
      "SELECT id, name, email, password_hash, role, is_active, otp FROM users WHERE email = ?",
      [email]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const user = users[0]

    if (!user.is_active) {
      return NextResponse.json(
        { success: false, message: "Account not active. Please verify OTP first." },
        { status: 403 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const { password_hash, otp, ...userSafe } = user

    // Generate JWT token valid for 1 day
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    )

    return NextResponse.json({
      success: true,
      user: userSafe,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    )
  }
}
