# 🧭 PathPilot - Your Personal Growth Guide

## 📋 Overview

**PathPilot** is a full-stack web application that helps students and young professionals (age 15-25) discover:
- 🎯 What skills to learn
- 💼 Which career path suits them best
- 📈 How to grow through personalized learning roadmaps

Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Key Features

### 🧠 Smart Onboarding Quiz
- 10 personalized questions covering interests, goals, experience level, and learning style
- Real-time progress tracking
- Instant recommendations after completion

### 🎯 AI-Powered Recommendations
- 2-3 tailored career path suggestions
- 5+ relevant skills with learning timelines
- Monthly learning roadmap with milestones
- Curated learning resources and courses

### 📊 Personalized Dashboard
- Career paths overview
- Skills to learn with difficulty levels
- Daily action plan with specific tasks
- Real-time progress tracking with visual indicators

### ✅ Task Management
- Auto-generated daily tasks (15-45 min each)
- Task completion tracking
- Progress streaks and analytics
- Weekly performance insights

### 💰 Flexible Subscription Plans

#### 📍 **Free Plan** - Forever Free
- Access to quiz & basic recommendations
- 2 career paths, 3 skills
- Daily action plan (limited to 3 tasks)
- Basic progress tracker
- Community support

#### ⭐ **Pro Plan** - $4.99/month ($49/year)
- Unlimited recommendations & skills
- Advanced daily tasks (unlimited)
- Weekly insights & analytics
- Priority email support
- Ad-free experience
- Downloadable resources
- Progress reports export

#### 🏆 **Premium Plan** - $9.99/month ($99/year)
- Everything in Pro +
- 1-on-1 mentorship matching
- Custom learning paths
- Access to exclusive courses
- Weekly progress calls
- Resume optimization tips
- Exclusive community (Discord)
- Interview prep materials
- Priority phone support

---

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Stripe** (optional) for payments

### Infrastructure
- **Docker** & Docker Compose for containerization
- **Vercel** for frontend deployment
- **Railway/Heroku** for backend deployment
- **MongoDB Atlas** for database

---

## 🚀 Quick Start

### Prerequisites
```bash
# Required
- Node.js 16+
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git
```

### Installation (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/hatemeant2009/PathPilot.git
cd PathPilot

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Install dependencies
npm install

# 4. Start development servers
npm run dev
```

**Access the app:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 📁 Project Structure

```
PathPilot/
├── 📱 frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── pages/                 # 6 main pages (Landing, Quiz, Dashboard, etc.)
│   │   ├── components/            # Reusable UI components
│   │   ├── services/              # API integration layer
│   │   ├── store/                 # Zustand state management
│   │   ├── App.tsx               # Main app component
│   │   ├── index.css             # Global styles with Tailwind
│   │   └── index.tsx
│   ├── tailwind.config.js
│   └── package.json
│
├── 🔧 backend/                     # Node.js/Express backend
│   ├── src/
│   │   ├── routes/                # 5 API route modules
│   │   │   ├── auth.routes.ts    # Auth (signup, login, verify)
│   │   │   ├── quiz.routes.ts    # Quiz & recommendations
│   │   │   ├── dashboard.routes.ts # Dashboard & tasks
│   │   │   ├── subscription.routes.ts # Subscription management
│   │   │   └── recommendations.routes.ts # Recommendation data
│   │   ├── models/                # MongoDB schemas
│   │   │   ├── User.ts
│   │   │   ├── Task.ts
│   │   │   ├── Recommendation.ts
│   │   │   ├── Progress.ts
│   │   │   └── Subscription.ts
│   │   ├── data/                  # Static data
│   │   │   └── recommendations.ts # Recommendation rules
│   │   └── server.ts             # Express app setup
│   ├── tsconfig.json
│   └── package.json
│
├── 📚 Documentation
│   ├── README.md                   # This file
│   ├── SETUP.md                   # Setup & troubleshooting guide
│   ├── DEPLOYMENT.md              # Production deployment
│   ├── CONTRIBUTING.md            # Contributing guidelines
│   └── .env.example               # Environment template
│
├── 🐳 Docker Setup
│   ├── backend/Dockerfile         # Backend container
│   └── docker-compose.yml         # Multi-container setup
│
└── package.json                   # Root package.json
```

---

## 🎮 User Journey

```
1. Landing Page → Learn about PathPilot features
   ↓
2. Signup/Login → Create account with email & password
   ↓
3. Quiz Page → Answer 10 personalized questions (3-5 min)
   ↓
4. Recommendations → Get career paths & skills
   ↓
5. Dashboard → View learning roadmap
   ↓
6. Daily Tasks → Complete suggested tasks
   ↓
7. Progress → Track achievements & streaks
   ↓
8. Upgrade (Optional) → Access Pro/Premium features
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup              # Register new user
POST   /api/auth/login               # Login & get JWT token
POST   /api/auth/verify              # Verify token validity
POST   /api/auth/refresh             # Refresh expired token
```

### Quiz & Recommendations
```
GET    /api/quiz/questions           # Get 10 quiz questions
POST   /api/quiz/submit              # Submit answers & generate recommendations
GET    /api/recommendations/:userId  # Get user recommendations
GET    /api/recommendations/:userId/career-paths
GET    /api/recommendations/:userId/skills
GET    /api/recommendations/:userId/roadmap
GET    /api/recommendations/:userId/resources
```

### Dashboard & Tasks
```
GET    /api/dashboard/:userId        # Get dashboard data
GET    /api/dashboard/:userId/tasks  # Get all tasks
PUT    /api/dashboard/tasks/:taskId/complete
GET    /api/dashboard/:userId/progress
PUT    /api/dashboard/:userId/profile
```

### Subscription
```
GET    /api/subscription/plans       # Get all plans
GET    /api/subscription/status/:userId
POST   /api/subscription/upgrade     # Upgrade plan
POST   /api/subscription/downgrade   # Downgrade to free
POST   /api/subscription/cancel      # Cancel subscription
```

---

## 📊 Quiz Question Examples

1. **What are your main interests?** → Tech, Business, Art, Communication, Science, Finance
2. **What's your primary goal?** → Get a job, Freelance, Start business, Self-growth
3. **What's your current experience level?** → Beginner, Intermediate, Advanced
4. **How much time can you dedicate weekly?** → 5-10 hrs, 10-20 hrs, 20+ hrs
5. **Preferred learning style?** → Videos, Hands-on practice, Reading, Combination
6. **What's your age group?** → 15-18, 19-22, 23-25
7. **Solo or team work?** → Solo, Teams, Both
8. **Technical background?** → None, Some, Strong
9. **Which outcome matters most?** → Skills, Certificate, Portfolio, Network
10. **Biggest challenge?** → Time, Motivation, Not knowing where to start, Money

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **CORS Protection** - Whitelist allowed origins
- ✅ **Rate Limiting** - Prevent brute force attacks
- ✅ **Input Validation** - Server-side validation with Joi
- ✅ **HTTPS Ready** - SSL/TLS support
- ✅ **Environment Variables** - Secure secret management

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
# Set REACT_APP_API_URL environment variable
```

### Backend (Railway/Heroku)
```bash
# Railway
railway login
railway up

# OR Heroku
heroku create your-app
git push heroku main
```

See **DEPLOYMENT.md** for detailed instructions.

---

## 📈 Performance

- ⚡ **Frontend**: React lazy loading, code splitting
- ⚡ **Backend**: Database indexing, caching
- ⚡ **Images**: Optimized and lazy-loaded
- ⚡ **Bundle Size**: ~50KB (gzipped)

---

## 🤝 Contributing

We welcome contributions! Please see **CONTRIBUTING.md** for:
- How to report bugs
- How to suggest features
- Pull request process
- Code style guidelines

---

## 📄 License

PathPilot is open source under the **MIT License**.

---

## 📞 Support & Contact

- 📧 Email: support@pathpilot.com
- 🐛 Issues: https://github.com/hatemeant2009/PathPilot/issues
- 💬 Discussions: https://github.com/hatemeant2009/PathPilot/discussions

---

## 🎯 Roadmap

### Version 1.1 (Next)
- [ ] Email notifications for tasks
- [ ] Social sharing of achievements
- [ ] Mobile app (React Native)
- [ ] Gamification (badges, points)

### Version 1.2
- [ ] Community forum
- [ ] Peer mentoring
- [ ] Resource marketplace
- [ ] Live coding sessions

### Version 1.3
- [ ] AI-powered recommendations
- [ ] Integration with job boards
- [ ] Resume builder
- [ ] Interview practice

---

## 🙏 Acknowledgments

Built with ❤️ for students and young professionals finding their path.

---

**Start your growth journey with PathPilot today! 🚀**

GitHub: https://github.com/hatemeant2009/PathPilot
