<div align="center">

# ⚡ Complaint Management System — Frontend

### A modern React interface for seamless complaint tracking & resolution

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🌐 Live Links

| | Link |
|---|---|
| 🖥️ **Frontend** | [your-app.vercel.app](https://complaint-management-system-fronten-self.vercel.app/) |
| ⚙️ **Backend API** | [your-api.onrender.com](https://complaint-management-system-vium.onrender.com) |
| 📁 **Backend Repo** | [complaint-management-backend](https://github.com/Yash-997/Complaint-Management-System) |

---

## 📌 Overview

A fully responsive React frontend for a complaint management workflow users can register, raise complaints, and track resolutions in real time.

Admins get a dedicated dashboard to manage, filter, and update complaint statuses. The app integrates with a **Spring Boot + PostgreSQL** backend via **Axios**, with **JWT-based protected routes** throughout.

> Clean UI. Secure flows. Real data. Deployed and live.

---

## ✅ Features

| | Feature |
|---|---|
| 🔐 | JWT Authentication (login, register, token persistence) |
| 🛡️ | Protected Routes role-based page access |
| 📝 | Complaint submission form with validation |
| 📋 | Complaint history with live status tracking |
| 🔄 | Admin dashboard view, filter & update complaints |
| 📱 | Fully responsive across desktop, tablet, mobile |
| 🔔 | Toast notifications for all user actions |
| ⚠️ | Global error handling via Axios interceptors |
| 🧭 | Client-side routing with React Router v6 |
| 🌐 | REST API integration with Spring Boot backend |

---

## 🎨 UI Highlights

- **Dashboard** — Role-specific views (USER vs ADMIN) with summary cards
- **Forms** — Controlled inputs, real-time validation, clear error states
- **Navigation** — Context-aware navbar with auth state, mobile hamburger menu
- **Design System** — Consistent Tailwind utility classes, spacing, and color palette
- **Feedback** — Loading spinners, disabled states, and toast messages on every action

---

## 🛠️ Tech Stack

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![REST API](https://img.shields.io/badge/REST_API-009688?style=flat-square&logo=fastapi&logoColor=white)]()

---

## 🖼️ Screenshots

<details>
<summary><strong>📸 Click to view UI screenshots</strong></summary>

<br>

**🏠 Landing Page**
> Screenshot here

**🔑 Login Page**
> Screenshot here

**📋 Register Page**
> Screenshot here

**📊 User Dashboard**
> Screenshot here

**📝 Complaint Form**
> Screenshot here

**📃 Complaint List / History**
> Screenshot here

**🛠️ Admin Dashboard**
> Screenshot here

**📱 Mobile View**
> Screenshot here

</details>

---

## 🗂️ Project Structure

```
src/
├── components/        # Reusable UI components (Button, Card, Navbar, etc.)
├── pages/             # Route-level page components
├── layouts/           # Shared layout wrappers (AuthLayout, DashboardLayout)
├── routes/            # Protected & public route definitions
├── services/          # Axios API calls (authService, complaintService)
├── context/           # AuthContext — global auth state
├── hooks/             # Custom hooks (useAuth, useComplaints)
├── utils/             # Token helpers, formatters, constants
├── assets/            # Images, icons, static files
└── App.jsx            # Root component with router setup
```

---

## 🔄 Application Flow

```
User Action (Login / Submit Complaint)
              │
              ▼
     ┌─────────────────┐
     │   React UI       │  ← Pages, Components, Forms
     └────────┬─────────┘
              │
              ▼
     ┌─────────────────┐
     │  Axios Service   │  ← API calls with JWT header injection
     └────────┬─────────┘
              │
              ▼
     ┌─────────────────┐
     │ Spring Boot API  │  ← REST endpoints with Spring Security
     └────────┬─────────┘
              │
              ▼
     ┌─────────────────┐
     │   PostgreSQL     │  ← Persistent data on Render
     └─────────────────┘
```

---

## 📄 Key Pages

| Page | Description |
|------|-------------|
| **Login** | JWT login with token stored in `localStorage`, redirect on success |
| **Register** | User signup with form validation and auto-redirect to login |
| **Dashboard** | Role-aware home screen stats for users, full controls for admins |
| **Create Complaint** | Validated form category, description, priority, submission |
| **Complaint History** | Personal complaint list with status badges and timestamps |
| **Admin Panel** | All complaints table filter by status, update with one click |

---

## 📱 Responsive Design

| Breakpoint | Support |
|------------|---------|
| 🖥️ Desktop (1280px+) | Full sidebar layout, data tables |
| 💻 Tablet (768px–1279px) | Collapsible sidebar, stacked cards |
| 📱 Mobile (< 768px) | Hamburger menu, single-column layout |

---

## ⚙️ Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/complaint-management-frontend.git
cd complaint-management-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# → Set VITE_API_URL (see below)

# 4. Start dev server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://your-backend-api.onrender.com
```

> `VITE_API_URL` — Base URL of the Spring Boot backend. All Axios requests are prefixed with this value. For local development, use `http://localhost:8080`.

---

## 🚀 Deployment

| Platform | Use Case | Command |
|----------|----------|---------|
| **Vercel** | Recommended for React/Vite | Auto-deploy via GitHub push |
| **Netlify** | Alt option with form support | `netlify deploy --prod` |
| **Render** | Co-deploy with backend | Static site from `dist/` folder |

> Build command: `npm run build` · Output directory: `dist`

---

## 🔮 Future Enhancements

- [ ] 🌙 Dark mode toggle
- [ ] 🔔 Real-time notifications via WebSockets
- [ ] 📊 Admin analytics charts for complaint volume & resolution rates
- [ ] 📁 File/image attachment on complaints
- [ ] 📲 PWA support for offline access
- [ ] 🌍 i18n multi-language support

---

## 💼 Why This Project Stands Out

> *For recruiters reviewing this repository*

| What It Shows | Why It Matters |
|---------------|----------------|
| **Full Stack Integration** | Seamlessly connects React UI to a secured Spring Boot REST API |
| **JWT Auth in React** | Token storage, Axios interceptors, auto-logout on expiry |
| **Enterprise Workflow** | Multi-role system with scoped views not a single-page CRUD demo |
| **Component Architecture** | Reusable components, custom hooks, context API structured for scale |
| **Responsive Design** | Mobile-first with Tailwind, tested across breakpoints |
| **Production Deployment** | Live on Vercel with env-secured API configuration |

---

## 👤 Author

**Yash Dabhade**
— [`GitHub`](https://github.com/Yash-997) · [`LinkedIn`](https://www.linkedin.com/in/yash-dabhade)

<div align="center">
  <sub>⭐ Found this useful? A star goes a long way!</sub>
</div>
