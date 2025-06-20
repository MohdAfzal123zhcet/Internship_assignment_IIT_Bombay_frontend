
---

## Frontend (`courses-frontend`)

![Screenshot (124)](https://github.com/user-attachments/assets/9c2cf48a-2c09-41a6-ba7b-f523993d41a7)



![Screenshot (125)](https://github.com/user-attachments/assets/21306c87-b432-476a-8140-7504ccd736ac)





# 🖥 Courses Frontend (React + Vite + Docker)

This is the React-based frontend for the Course Management System. It allows users to add, update, and view courses and course instances.

---

# Tech Stack

- React
- Vite
- JavaScript
- Docker

---

# Features

- View all courses
- Create and delete courses
- View all course instances
- Create course instances
- Responsive and simple UI

---

# Development Setup

Install dependencies:

bash
npm install

 # Start the development server
npm run dev

# http://localhost:5173 → React app

# Build Docker image
docker build -t mohdafzal123/course-frontend .


# Push to DockerHub
docker login
docker push mohdafzal123/course-frontend



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
