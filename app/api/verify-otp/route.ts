import { executeQuery } from "@/lib/database"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    const result: any = await executeQuery(
      "SELECT id, otp FROM users WHERE email = ? LIMIT 1",
      [email]
    )

    if (result.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    const user = result[0]

    if (user.otp === otp) {
      await executeQuery(
        "UPDATE users SET is_active = TRUE, otp = NULL, updated_at = NOW() WHERE id = ?",
        [user.id]
      )

      return NextResponse.json({ success: true, message: "OTP verified successfully" })
    }

    return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
