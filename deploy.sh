#!/bin/bash

# Manual Deployment Script for CyberWave Security
# Use this for manual deployments when CI/CD is not set up yet

set -e  # Exit on error

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}"
echo "========================================="
echo "  CyberWave Security - Manual Deploy"
echo "========================================="
echo -e "${NC}"

# Check if .env files exist
if [ ! -f ".env.production" ]; then
    echo -e "${RED}Error: .env.production not found${NC}"
    echo "Create .env.production with VITE_API_URL=your-production-api-url"
    exit 1
fi

if [ ! -f "backend/.env" ]; then
    echo -e "${RED}Warning: backend/.env not found${NC}"
    echo "Make sure to create backend/.env on the server"
fi

# Ask what to deploy
echo -e "${YELLOW}What would you like to deploy?${NC}"
echo "1) Frontend only"
echo "2) Backend only"
echo "3) Both frontend and backend"
read -p "Enter choice [1-3]: " choice

deploy_frontend() {
    echo -e "\n${YELLOW}Building frontend...${NC}"

    # Build frontend
    npm run build

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Frontend built successfully${NC}"
        echo -e "\n${YELLOW}Upload the 'dist' folder to IONOS httpdocs via FTP${NC}"
        echo "Recommended FTP clients:"
        echo "  - FileZilla: https://filezilla-project.org/"
        echo "  - WinSCP: https://winscp.net/"
        echo ""
        echo "Upload to: /httpdocs/"
        echo "Dist folder location: $(pwd)/dist/"
    else
        echo -e "${RED}✗ Frontend build failed${NC}"
        exit 1
    fi
}

deploy_backend() {
    echo -e "\n${YELLOW}Preparing backend for deployment...${NC}"

    cd backend

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "Installing backend dependencies..."
        npm install --production
    fi

    echo -e "${GREEN}✓ Backend ready for deployment${NC}"

    echo -e "\n${YELLOW}Backend deployment steps:${NC}"
    echo "1. Upload 'backend' folder to IONOS via FTP/SSH"
    echo "2. SSH into your IONOS server"
    echo "3. Navigate to backend directory"
    echo "4. Run: npm install --production"
    echo "5. Create .env file with production settings"
    echo "6. Run: pm2 start src/server.js --name cyberwave-api"
    echo "7. Run: pm2 save"
    echo ""
    echo "Backend folder location: $(pwd)"

    cd ..
}

case $choice in
    1)
        deploy_frontend
        ;;
    2)
        deploy_backend
        ;;
    3)
        deploy_frontend
        deploy_backend
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}"
echo "========================================="
echo "  Deployment preparation complete!"
echo "========================================="
echo -e "${NC}"

echo -e "${YELLOW}Next steps:${NC}"
echo "1. Upload files to IONOS via FTP or SSH"
echo "2. Configure production .env files on server"
echo "3. Test your deployment"
echo ""
echo -e "${YELLOW}For automated deployment, see:${NC}"
echo ".github/CICD_SETUP.md"
