import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import WebsiteSetting from "@/models/setting";

// ✅ POST - Create New Website Settings (Only for First-Time Setup)
export async function POST(request: NextRequest) {
  try {
    const { title, description, logo, paymentMethods, stats } = await request.json();

    await connectToDb();

    const existingSettings = await WebsiteSetting.findOne();
    if (existingSettings) {
      return NextResponse.json(
        { error: "Settings already exist!" },
        { status: 400 }
      );
    }

    const newSettings = new WebsiteSetting({
      title: title || "Unique Store BD",
      description: description || "Best ecommerce store in Bangladesh",
      logo: logo || "/default-logo.png",
      paymentMethods: paymentMethods || { bkash: "", nagad: "" },
      stats: stats || { totalUsers: 0, todayDeposits: 0, todayWithdrawals: 0 },
    });

    await newSettings.save();

    return NextResponse.json(
      { message: "Website settings created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create settings:", error);
    return NextResponse.json(
      { error: "Failed to create website settings" },
      { status: 500 }
    );
  }
}

// ✅ GET Website Settings
export async function GET() {
  try {
    await connectToDb();
    let settings = await WebsiteSetting.findOne();

    if (!settings) {
      settings = new WebsiteSetting();
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 }
    );
  }
}

// ✅ PATCH - Update Website Settings
export async function PATCH(request: NextRequest) {
  try {
    const { title, description, logo, paymentMethods, stats } = await request.json();

    await connectToDb();
    let settings = await WebsiteSetting.findOne();

    if (!settings) settings = new WebsiteSetting();

    if (title) settings.title = title;
    if (description) settings.description = description;
    if (logo) settings.logo = logo;

    if (paymentMethods?.bkash) settings.paymentMethods.bkash = paymentMethods.bkash;
    if (paymentMethods?.nagad) settings.paymentMethods.nagad = paymentMethods.nagad;

    if (stats?.totalUsers !== undefined) settings.stats.totalUsers = stats.totalUsers;
    if (stats?.todayDeposits !== undefined) settings.stats.todayDeposits = stats.todayDeposits;
    if (stats?.todayWithdrawals !== undefined) settings.stats.todayWithdrawals = stats.todayWithdrawals;

    await settings.save();

    return NextResponse.json({ message: "Settings updated successfully!" });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
