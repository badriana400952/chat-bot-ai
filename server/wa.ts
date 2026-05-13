import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import axios from "axios";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, {
    small: true,
  });
});

client.on("ready", () => {
  console.log("WhatsApp Connected ✅");
});

client.on("message", async (msg) => {
  try {
    // jangan balas pesan sendiri
    if (msg.fromMe) return;

    // ambil pesan
    const text = msg.body?.trim();

    // kalau kosong skip
    if (!text) return;

    console.log("Message:", text);

    // kirim ke AI API
    const response = await axios.post(
      "http://localhost:3000/api/ai/chat",
      {
        message: text,
         number: msg.from, 
      }
    );

    // ambil reply AI
    const reply = response.data.reply;

    // balas ke whatsapp
    await msg.reply(reply);
  } catch (error) {
    console.log(error);
  }
});

client.initialize();