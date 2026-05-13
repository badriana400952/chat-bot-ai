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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.




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
