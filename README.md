This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# 🧩 Custom Dashboard (React + Zustand + TypeScript)

A fully customizable personal dashboard built with **Next.js**, **Zustand**, and **TypeScript**.  
The dashboard includes **Drag & Drop widgets**, **Custom Themes**, and complete **CRUD functionalities** for Notes, Tasks, and Calendar Events.

# Live Link
https://custom-dashboard-eta.vercel.app/

---

## 🚀 Features

### ✅ **1. Custom Themes**
- Light/Dark/Purple/Blue/Mixed themes supported  
- State persisted using Zustand + localStorage  
- Theme instantly updates across the dashboard  

---

### ✅ **2. Widgets with Drag & Drop**
- Reorder dashboard widgets  
- Widgets include:
  - 📝 Notes  
  - ✅ Tasks  
  - 📅 Calendar  
- Position is saved automatically  
- Smooth drag experience

---

### ✅ **3. Notes – CRUD Functionality**
- Add new note  
- Edit note  
- Delete note  
- Notes persist in localStorage  
- Uses unique ID via `crypto.randomUUID()`  

---

### ✅ **4. Tasks – CRUD Functionality**
- Add new task  
- Edit task  
- Delete task  
- Task list saved in localStorage  

---

### ✅ **5. Calendar Events – CRUD Functionality**
- Add calendar event  
- Edit event title  
- Delete event  
- Fully persisted storage  

---

### ✅ **6. Fully Persisted State with Zustand**
- Uses `persist` middleware  
- State saved as `dashboard-storage`  
- Loads automatically on refresh  
- `_hasHydrated` flag prevents hydration issues  

---

## 🧱 **Tech Stack**

| Technology | Purpose |
|-----------|---------|
| **Next.js 14+** | App Router + Client components |
| **TypeScript** | Type-safety |
| **Zustand** | Global state management |
| **Tailwind CSS** | Styling |
| **React DnD / Sortable Logic** | Drag & Drop |
| **localStorage** | State persistence |

---

## 📂 Project Structure

src/
├── app/
│ ├── layout.tsx
│ └── page.tsx
├── components/
├── store/
│ └── useStore.ts (Zustand logic)
└── types/
└── index.ts


## 🧠 Zustand Store Summary

Store supports:

✅ theme change  
✅ add / delete / update note  
✅ add / delete / update task  
✅ add / delete / update calendar event  
✅ reorder widgets  
✅ hydration tracking  

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