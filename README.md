# Welcome to your Cosign Connect

## Project info

## How can I edit this code?

There are several ways of editing the application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
Start the development server with auto-reloading and an instant preview.
npm run dev
```

# Consign Connect - Developer Documentation

## 📁 Project Structure

```
/Backend
  ├── controllers/          # API logic controllers
  ├── models/               # Mongoose models
  ├── routes/               # Express API route definitions
  ├── services/             # Shopify, StockX, and other service integrations
  ├── jobs/                 # Cron jobs and sync scripts
  ├── .env                  # Environment variables
  └── server.js             # Main Express app entry point

/frontend
  ├── src/
      ├── components/       # Reusable UI components
      ├── pages/            # Page-level components and routes
      ├── lib/              # Utility functions, contexts, and hooks
      └── main.tsx          # React/Vite entry point
```

---

## 🚀 Getting Started

### Backend Setup
1. Navigate to `/Backend`:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   SHOPIFY_ACCESS_TOKEN=your_shopify_token
   SHOPIFY_STORE_URL=your_store_url.myshopify.com
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to `/frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔁 Branching Strategy (GitHub)

All development is structured into multiple branches to ensure code quality and organized deployment.

### Main Branches:
- `main`: Production-ready code
- `staging`: Pre-release testing branch
- `testing`: Internal test branch
- `Dev`: Aggregated development branch from all developers

### Developer Workflow:
Each developer must:
1. Create a personal branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b yourname-dev
   git push -u origin yourname-dev
   ```
2. Commit to your `yourname-dev` branch.
3. When features are stable, create a PR to `Dev`.
4. Code from `Dev` moves to `testing`, then to `staging`, and finally to `main`.

---

## ✅ Testing Policy

### Run tests at every level:
- **Local Dev**: Run tests before pushing
- **Dev Branch**: PRs must be tested
- **Testing**: Automated integration tests
- **Staging**: Final acceptance tests before production

Backend uses **Jest + Supertest** for testing.
Frontend testing will be added with **React Testing Library** and **Playwright/Cypress** later.

Example backend test command (to be implemented):
```bash
npm test
```

---

## 📦 Backend Overview

Backend is a Node.js + Express API with MongoDB (via Mongoose). It handles:
- Inventory CRUD
- Shopify GraphQL integration
- StockX scraping (via Cheerio)
- Background sync jobs

**Dev dependencies include:**
- `nodemon`: live-reload during dev
- `jest` & `supertest`: for unit/integration testing

---

## 💻 Frontend Overview

Built with **React + Vite + TypeScript**, styled using **TailwindCSS** + **Radix UI**.

Key libraries:
- `react-router-dom`: routing
- `react-hook-form` + `zod`: forms & validation
- `@tanstack/react-query`: async data management
- `recharts`: data visualization
- `lucide-react`: icons

Scripts:
- `npm run dev`: Start development server
- `npm run build`: Production build
- `npm run lint`: Code linting

---

## 🛡️ Best Practices
- Use `.env` files for secrets. Never commit them.
- Write tests for all new features.
- Use consistent naming: kebab-case for files, camelCase for variables.
- Commit messages should follow this format:
  ```
  feat: short feature summary
  fix: short bug fix description
  docs: updating documentation
  ```
- Use PR reviews to catch bugs early and improve code quality.

---

## 🧠 Future Considerations
- Add full test coverage (frontend + backend)
- Add CI/CD for automatic testing and deployment
- Integrate authentication and authorization layer
- Implement role-based permissions

---

Lets let the code be clean, the commits be clear, and the bugs be few. 🚀

## What technologies are used for this project?

This project is built with:

Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

Backend:
- Nodejs
- Express.js
- MongoDb
- GraphQL
