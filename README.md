# Blackcoffer Analytics Dashboard

A responsive full-stack analytics dashboard built as part of the Blackcoffer Screening Assessment.

## Live Deployment

https://blackcoffer-dashboard-mocha.vercel.app/

---

## Tech Stack

- Next.js
- React.js
- MongoDB Atlas
- Tailwind CSS
- Recharts
- Vercel

---

## Features

- Dynamic filter system
- Interactive data visualizations
- MongoDB integration
- REST API architecture
- Responsive dashboard UI
- Production deployment on Vercel
- Real-time chart updates based on filters

---

## Dashboard Visualizations

- Intensity Score (Bar Chart)
- Likelihood Stats (Line Chart)
- Relevance Overview (Pie Chart)
- Geographic Reach (Area Chart)

---

## API Routes

- `/api/data`
- `/api/filters`
- `/api/topics`
- `/api/regions`
- `/api/countries`
- `/api/sectors`

---

## Installation & Setup

Clone the repository:

bash
git clone <your-private-repo-url>

Install dependencies:

npm install

Create .env.local:

MONGODB_URI=your_mongodb_connection_string

Run development server:

npm run dev

Open:

http://localhost:3000
Production Build
npm run build
Deployment

The project is deployed on Vercel.

Notes
Repository has been kept private as instructed in the assignment guidelines.
Environment variables and MongoDB credentials are secured and not exposed publicly.

Then:


git add README.md
git commit -m "Added README documentation"
git push

Your Vercel deployment will auto-update.
