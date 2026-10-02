import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existingUser = await db.user.findFirst();
    
    if (existingUser) {
      return NextResponse.json({ message: "Sistemde halihazırda bir yönetici bulunuyor." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await db.user.create({
      data: {
        email: "admin@yapimodern.com.tr",
        name: "Sistem Yöneticisi",
        password: hashedPassword,
      },
    });

    return NextResponse.json({ 
      message: "Yönetici hesabı başarıyla oluşturuldu.",
      email: user.email,
      password: "Şifre: 123456"
    });
  } catch (error) {
    console.error("Kurulum hatası:", error);
    return NextResponse.json({ error: "Yönetici oluşturulurken hata meydana geldi." }, { status: 500 });
  }
}
