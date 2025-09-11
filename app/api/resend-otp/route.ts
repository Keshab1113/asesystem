import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { executeQuery } from "@/lib/database"; // your mysql2 helper

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Check if user exists
    const users = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];

    // 2. Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 3. Update OTP in database
    await executeQuery("UPDATE users SET otp = ? WHERE email = ?", [
      otp,
      email,
    ]);

    // 4. Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER_NOREPLY,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 5. Send OTP email
    await transporter.sendMail({
      from: `"ASESystem - No Reply" <${process.env.MAIL_USER_NOREPLY_VIEW}>`,
      to: email,
      replyTo: process.env.MAIL_USER_NOREPLY_VIEW,
      subject: "ASESystem - Your New OTP Code",
      text: `Hello ${user.name},

We have generated a new One-Time Password (OTP) for you.

Your new OTP code is: ${otp}

⚠️ This code is valid for 10 minutes only.
Do not share this code with anyone.

Best regards,
ASESystem Team`,
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #2563eb; text-align: center; margin-bottom: 20px;">ASESystem</h2>
      <p style="font-size: 16px; color: #333;">Hello <b>${user.name}</b>,</p>
      <p style="font-size: 16px; color: #333;">We have generated a new One-Time Password (OTP) for your account verification:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #2563eb; background: #e0f2fe; padding: 12px 24px; border-radius: 6px; letter-spacing: 4px;">
          ${otp}
        </span>
      </div>
      
      <p style="font-size: 15px; color: #555;">⚠️ This code is valid for <b>10 minutes</b>. Please do not share it with anyone.</p>
      
      <p style="margin-top: 30px; font-size: 14px; color: #777;">Best regards,</p>
      <p style="font-size: 14px; font-weight: bold; color: #333;">ASESystem Team</p>
    </div>
    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 15px;">
      © ${new Date().getFullYear()} ASESystem. All rights reserved.
    </p>
  </div>
  `,
    });

    return NextResponse.json({
      success: true,
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to resend OTP" },
      { status: 500 }
    );
  }
}
