# Axios + TanStack Query Practice

A small practice project to learn how to use **Axios** and **TanStack Query (React Query)** together in a React + TypeScript app.

## 📦 Tech Stack

- React 19 + TypeScript
- Vite (dev server + build)
- Axios (HTTP client)
- TanStack Query (data fetching + caching)
- ESLint (type-aware rules)

## ✨ Features

- Custom Axios instance with `baseURL`, `timeout`, and JSON headers
- Fetch a list of users from `https://dummyjson.com`
- Data caching and loading/error states with TanStack Query

## 🛠️ Getting Started

### Requirements

- Node.js 18+
- pnpm (recommended) or npm

### Install and run

```bash
git clone https://github.com/armandezfuli/axios-tanstak-practice.git
cd axios-tanstak-practice

# install dependencies
pnpm install

# start dev server
pnpm dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
pnpm build
pnpm preview
```

## 📁 Project Structure

```
axios-tanstak-practice/
├── public/           # static files
├── src/              # app source code
│   ├── api/          # Axios setup
│   ├── hooks/        # TanStack Query hooks
│   └── ...           # components, pages, etc.
├── index.html
├── vite.config.ts
├── tsconfig*.json
├── eslint.config.js
└── package.json
```

## 🔧 Axios Setup

```ts
// src/api/axios.ts
import axios from "axios"

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10_000, // cancel the request after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
})
```

## 🔄 Fetching Data with TanStack Query

```tsx
import { useQuery } from "@tanstack/react-query"
import { api } from "../api/axios"

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users")
  return data.users
}

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
```

## 🧪 Ideas to Extend

- [ ] Add pagination to the users list
- [ ] Add search with debounce
- [ ] Use `useMutation` to create/update users
- [ ] Add optimistic updates
- [ ] Improve loading and error UI

## 📜 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

## 📄 License

This project is for learning and practice purposes.
