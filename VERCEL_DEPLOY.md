# 🚀 Deploying Devil's Coin Frontend to Vercel

This guide provides step-by-step instructions for deploying the Devil's Coin frontend to Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (connect with GitHub)
- Repository pushed to GitHub: `https://github.com/AstridNielsen-lab/Devils-Coin`

## 🔧 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository: `AstridNielsen-lab/Devils-Coin`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   Click "Environment Variables" and add:
   ```
   REACT_APP_API_URL = https://your-backend-api.com
   REACT_APP_CONTRACT_ADDRESS = 0x... (your deployed contract)
   REACT_APP_CHAIN_ID = 1 (or your target chain ID)
   REACT_APP_CHAIN_NAME = Ethereum
   REACT_APP_RPC_URL = https://mainnet.infura.io/v3/YOUR_PROJECT_ID
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be available at: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Root Directory**
   ```bash
   # Navigate to project root
   cd devils-coin
   
   # Deploy using vercel.json config
   vercel --prod
   ```

4. **Follow CLI Prompts**
   - Set up and deploy: `Y`
   - Link to existing project: `N` (first time)
   - Project name: `devils-coin` or your preferred name
   - Directory: `./` (current directory)

## 🔧 Configuration Files

The project includes pre-configured files for Vercel:

### `vercel.json` (Updated - Optimized for Monorepo)
```json
{
  "buildCommand": "cd frontend && npm ci && npm run build",
  "outputDirectory": "frontend/build",
  "installCommand": "npm ci",
  "devCommand": "cd frontend && npm start",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `.nvmrc` (Node.js Version)
```
20.11.0
```

### `.vercelignore`
```
contracts/
backend/
scripts/
docs/
node_modules/
```

## 🌍 Environment Variables Setup

### For Development/Testnet
```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CONTRACT_ADDRESS=0x... # Your testnet contract
REACT_APP_CHAIN_ID=5 # Goerli
REACT_APP_CHAIN_NAME=Goerli
REACT_APP_RPC_URL=https://goerli.infura.io/v3/YOUR_PROJECT_ID
```

### For Production/Mainnet
```bash
REACT_APP_API_URL=https://api.devilscoin.io
REACT_APP_CONTRACT_ADDRESS=0x... # Your mainnet contract
REACT_APP_CHAIN_ID=1
REACT_APP_CHAIN_NAME=Ethereum
REACT_APP_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
```

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Production**: Deploys automatically when you push to `main` branch
- **Preview**: Creates preview deployments for pull requests
- **Branches**: You can configure other branches for staging

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Go to your project dashboard on Vercel
2. Click "Analytics" tab
3. View performance metrics, page views, etc.

### Error Monitoring
1. Check "Functions" tab for API errors (if using Vercel functions)
2. Monitor build logs in "Deployments" tab
3. Set up error alerts in project settings

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails - Dependencies Error**
   ```bash
   # Solution: Check if frontend/package.json has correct dependencies
   cd frontend
   npm install
   npm run build # Test locally first
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `REACT_APP_`
   - Check they're set in Vercel dashboard
   - Redeploy after adding variables

3. **Wrong Directory Structure**
   - Ensure `vercel.json` points to `frontend/build`
   - Check `.vercelignore` excludes unnecessary folders

4. **Routing Issues (404 on page refresh)**
   - Add rewrite rules in `vercel.json`:
   ```json
   "rewrites": [
     {
       "source": "/(.*)",
       "destination": "/index.html"
     }
   ]
   ```

### Debug Commands

```bash
# Check build locally
cd frontend
npm run build
npm install -g serve
serve -s build

# Check Vercel logs
vercel logs

# Redeploy
vercel --prod --force
```

## 🎯 Custom Domain Setup

1. **In Vercel Dashboard**
   - Go to project settings
   - Click "Domains"
   - Add your custom domain (e.g., `devilscoin.io`)

2. **DNS Configuration**
   - Add CNAME record: `www` → `your-project.vercel.app`
   - Add A record: `@` → Vercel's IP (provided in dashboard)

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes

## 📈 Performance Optimization

### Build Optimization
1. **Enable compression** (already configured in `vercel.json`)
2. **Optimize images** - Use WebP format when possible
3. **Code splitting** - Already configured in React
4. **Bundle analysis**:
   ```bash
   cd frontend
   npm run analyze
   ```

### Caching
- Static assets cached automatically
- API responses: Configure cache headers in backend
- CDN: Vercel provides global CDN automatically

## 🔐 Security Headers

Already configured in `vercel.json`:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **React Deployment**: https://create-react-app.dev/docs/deployment/
- **Project Issues**: https://github.com/AstridNielsen-lab/Devils-Coin/issues

---

**🎉 Your Devil's Coin frontend should now be live on Vercel!**

Visit your deployment URL to see the dark-themed, animated homepage with the devilish Devil's Coin branding! 🔥👹

