# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel
```

### Step 2: Configure Environment
Set these in Vercel dashboard:
- `REACT_APP_API_URL=https://your-api.com/api`

## Backend Deployment (Railway/Heroku)

### Option 1: Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd backend
railway up
```

### Option 2: Heroku
```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

## Database Setup

### MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to `.env`: `MONGODB_URI=mongodb+srv://...`

### Firebase (Alternative)
1. Go to https://console.firebase.google.com
2. Create new project
3. Configure Firestore Database
4. Add credentials to `.env`

## Environment Variables

Copy `.env.example` and fill in your values:

```bash
# Backend
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...

# Frontend
REACT_APP_API_URL=https://your-backend.com/api
```

## Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up SSL certificates
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Configure rate limiting
- [ ] Test all features
- [ ] Set up error tracking (Sentry)

## Monitoring

Set up monitoring with:
- **Uptime Monitoring:** UptimeRobot
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics
- **Performance:** Datadog

## Domain Configuration

### Custom Domain on Vercel
1. Go to Vercel Project Settings
2. Domains → Add Domain
3. Update DNS records

### Custom Domain on Railway
1. Railway Dashboard → Domain
2. Add custom domain
3. Update DNS CNAME records

---

For detailed guides, visit:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
