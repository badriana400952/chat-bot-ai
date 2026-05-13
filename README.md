This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


#  Chat Bot AI - WhatsApp Customer Service

Aplikasi ini adalah sistem **Customer Service otomatis berbasis AI** yang terintegrasi dengan WhatsApp.

Bot ini bisa:
- Membalas chat customer otomatis
- Menyimpan history chat (memory)
- Melayani banyak nomor sekaligus
- Mengarahkan ke admin jika diperlukan

---

#  FITUR UTAMA

 Auto reply WhatsApp  
 AI Chat (OpenAI GPT)  
 Memory percakapan per nomor  
 Human takeover (admin)  
 Soft selling (bisa bantu closing)  
 Logging & error handling  

---

#  TEKNOLOGI YANG DIGUNAKAN

## Backend
- Next.js (API route)
- Prisma ORM
- PostgreSQL (Database)

## AI
- OpenAI API

## WhatsApp
- whatsapp-web.js
- puppeteer (internal)

## Tools tambahan
- Axios → request API
- Dayjs → waktu
- Pino → logging
- Zod → validation
- Zustand → state management
- Socket.io → realtime (opsional)

---
#  ENV

    DATABASE_URL=
    POSTGRES_URL=
    PRISMA_DATABASE_URL=
    OPENAI_API_KEY=



#  INSTALL DEPENDENCY

```bash
pnpm install
