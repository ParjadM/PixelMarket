# Pixel Market - Vercel Deployment Guide

## 🚀 Production Deployment Setup

### Prerequisites
- Vercel account
- MongoDB Atlas account (or MongoDB database)
- Domain name (optional)

### 1. Environment Variables Setup

Create these environment variables in Vercel:

#### Required Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pixelmarket
JWT_SECRET=your_super_secure_jwt_secret_key_here
NODE_ENV=production
CLIENT_URL=https://your-domain.vercel.app
```

#### Optional Variables (for contact form):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
```

#### Optional Variables (for AI features):
```
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### 2. Database Setup

1. **MongoDB Atlas** (Recommended):
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Add it to `MONGODB_URI` environment variable

2. **Local MongoDB** (Alternative):
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/pixelmarket`

### 3. Vercel Deployment Steps

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV
vercel env add CLIENT_URL
```

#### Option B: Deploy via GitHub
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will auto-deploy on every push

### 4. Project Structure for Vercel

The project is configured with:
- `vercel.json` - Main Vercel configuration
- `backend/vercel.json` - Backend-specific configuration
- Environment-based API URLs
- Production-optimized build settings

### 5. Build Configuration

#### Frontend Build:
- Uses Vite for optimized production builds
- Output directory: `frontend/dist`
- Minified and optimized for production

#### Backend Build:
- Uses Node.js runtime
- Entry point: `backend/server.js`
- Handles API routes and static file serving

### 6. CORS Configuration

The backend is configured to allow:
- Development: All origins
- Production: Only specified domains
- Vercel domains are pre-configured

### 7. File Uploads

- Uploads are served from `/uploads` endpoint
- Files are stored in `backend/uploads/` directory
- For production, consider using cloud storage (AWS S3, Cloudinary)

### 8. Performance Optimizations

#### Frontend:
- Vite build optimization
- Code splitting
- Asset optimization
- Minification

#### Backend:
- Express.js optimization
- MongoDB connection pooling
- JWT token optimization
- CORS preflight handling

### 9. Monitoring & Debugging

#### Vercel Dashboard:
- View deployment logs
- Monitor performance
- Check function execution

#### Environment Variables:
- Verify all required variables are set
- Check variable values in Vercel dashboard

### 10. Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Frontend loading correctly
- [ ] Authentication working
- [ ] File uploads working
- [ ] CORS configured properly

### 11. Troubleshooting

#### Common Issues:

1. **CORS Errors**:
   - Check `CLIENT_URL` environment variable
   - Verify allowed origins in server.js

2. **Database Connection**:
   - Check `MONGODB_URI` format
   - Verify MongoDB Atlas network access

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Authentication Issues**:
   - Check `JWT_SECRET` is set
   - Verify cookie settings

### 12. Custom Domain (Optional)

1. Add domain in Vercel dashboard
2. Update DNS records
3. Update `CLIENT_URL` environment variable
4. Update CORS allowed origins

### 13. Security Considerations

- Use strong JWT secrets
- Enable HTTPS only
- Configure proper CORS
- Use environment variables for secrets
- Regular security updates

### 14. Backup Strategy

- Database: MongoDB Atlas automatic backups
- Code: GitHub repository
- Environment: Vercel environment variables export

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Check deployment status
vercel ls
```

## 📞 Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check database connectivity

---

**Happy Deploying! 🚀**
