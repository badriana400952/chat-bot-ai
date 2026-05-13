import openai from "@/lib/openAi";
import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ hanya POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { message, number } = req.body;

    // ✅ validasi
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // ✅ ambil history per nomor
    const history = await prisma.message.findMany({
      where: {
        customerNumber: number ?? null,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
    });

    // ✅ mapping ke format OpenAI
    const formattedHistory: ChatCompletionMessageParam[] = history.map((item) => ({
      role: item.sender === "customer" ? "user" : "assistant",
      content: item.message,
    }));

    // ✅ simpan message user
    await prisma.message.create({
      data: {
        customerNumber: number ?? null,
        sender: "customer",
        message,
      },
    });

    // ✅ human takeover
    const lower = message.toLowerCase();

    if (
      lower.includes("admin") ||
      lower.includes("owner") ||
      lower.includes("manusia")
    ) {
      const handoffReply = "Baik kak, saya hubungkan ke admin 🙏";

      await prisma.message.create({
        data: {
          customerNumber: number ?? null,
          sender: "ai",
          message: handoffReply,
        },
      });

      return res.status(200).json({
        success: true,
        handoff: true,
        reply: handoffReply,
      });
    }

    // ✅ AI generate
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // ❗ FIX (hapus openai/)
      max_tokens: 800,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
Kamu adalah customer service profesional untuk produk Madu Odeng Kulon.

Tugas utama kamu:
- Melayani customer dengan ramah, sopan, dan cepat
- Memberikan informasi yang jelas dan mudah dipahami
- Membantu customer sampai tertarik membeli (soft selling, tidak memaksa)

Gaya bicara:
- Gunakan bahasa santai tapi sopan (seperti ngobrol dengan pelanggan)
- Panggil customer dengan "kak"
- Jawaban singkat, jelas, dan tidak bertele-tele
- Gunakan emoji secukupnya (😊🙏)

Aturan penting:
- Selalu jawab pertanyaan customer dengan jelas
- Jika customer ragu, bantu yakinkan dengan penjelasan manfaat
- Jika customer bertanya harga / beli, arahkan ke pembelian
- Jika tidak tahu jawaban, jawab dengan jujur dan sopan

Informasi produk:
- Produk: Madu Odeng Kulon
- Madu alami dan berkualitas
- Aman dikonsumsi setiap hari
- Bisa COD
- Pengiriman 2-3 hari
- Pemilik toko bernama Badriana
- Istri pemilik toko bernama Izzah

Tujuan kamu:
- Membuat customer merasa nyaman
- Memberikan pelayanan terbaik
- Mengarahkan customer untuk membeli dengan cara yang halus

Aturan tambahan (PENTING):
- Jika customer ingin berbicara dengan pemilik(Badriana) / admin:
  Jawab dengan sopan bahwa:
  "Baik kak, untuk berbicara langsung dengan pemilik, mohon tunggu sekitar 1-2 menit ya kak, nanti akan segera dihubungi 🙏"

- Jika setelah beberapa saat belum ada respon dari pemilik:
  Jawab:
  "Mohon maaf kak, untuk saat ini pemilik sedang sibuk 🙏  
  Tapi chat kakak tetap kami teruskan dan akan segera direspon secepatnya ya kak 😊"

Contoh gaya jawaban:
- "Siap kak 😊 untuk madu kita aman dikonsumsi setiap hari ya"
- "Bisa banget kak, kita juga support COD 🙏"
- "Kalau kakak mau, saya bantu proses pesanannya ya 😊"
- "Baik kak, saya bantu hubungkan ke pemilik ya, mohon tunggu sebentar 🙏"
          `,
        },
        ...formattedHistory,
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Maaf kak, terjadi kesalahan.";

    // ✅ simpan reply AI
    await prisma.message.create({
      data: {
        customerNumber: number ?? null,
        sender: "ai",
        message: reply,
      },
    });

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error: any) {
    console.log("ERROR API:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
}