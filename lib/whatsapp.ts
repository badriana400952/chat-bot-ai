import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";

import qrcode from "qrcode-terminal";

export async function connectWhatsApp() {
  const { state, saveCreds } =
    await useMultiFileAuthState(
      "baileys_auth"
    );

  const sock = makeWASocket({
    auth: state,
  });

  sock.ev.on(
    "connection.update",
    ({ connection, qr, lastDisconnect }) => {
      if (qr) {
        qrcode.generate(qr, {
          small: true,
        });
      }

      if (connection === "close") {
        const shouldReconnect =
          (
            lastDisconnect?.error as any
          )?.output?.statusCode !==
          DisconnectReason.loggedOut;

        if (shouldReconnect) {
          connectWhatsApp();
        }
      }

      if (connection === "open") {
        console.log(
          "WhatsApp Connected ✅"
        );
      }
    }
  );

  sock.ev.on(
    "creds.update",
    saveCreds
  );

  return sock;
}