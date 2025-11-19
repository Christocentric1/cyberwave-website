#!/bin/bash

# CyberWave Backend Setup Script
# This script helps you set up the backend environment

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}"
echo "========================================="
echo "  CyberWave Backend Setup"
echo "========================================="
echo -e "${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
echo ""

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed successfully"
else
    echo -e "${RED}✗${NC} Failed to install dependencies"
    exit 1
fi
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓${NC} .env file created from .env.example"
    echo ""
    echo -e "${YELLOW}⚠ IMPORTANT: Please edit the .env file with your actual credentials:${NC}"
    echo "  - Database credentials (IONOS MySQL)"
    echo "  - SMTP credentials (IONOS email)"
    echo "  - Recipient email"
    echo ""
    echo -e "${YELLOW}Run this command to edit:${NC}"
    echo "  nano .env"
    echo ""
else
    echo -e "${YELLOW}⚠${NC} .env file already exists, skipping creation"
    echo ""
fi

# Check if MySQL is accessible (optional)
echo -e "${YELLOW}Checking MySQL connectivity...${NC}"
if command -v mysql &> /dev/null; then
    echo -e "${GREEN}✓${NC} MySQL client found"
    echo "  You can test your connection with:"
    echo "  mysql -u YOUR_USER -p -h YOUR_HOST YOUR_DATABASE"
else
    echo -e "${YELLOW}⚠${NC} MySQL client not found (this is OK if connecting remotely)"
fi
echo ""

# Summary
echo -e "${GREEN}"
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo -e "${NC}"
echo "Next steps:"
echo ""
echo "1. Configure your .env file:"
echo -e "   ${YELLOW}nano .env${NC}"
echo ""
echo "2. Start the development server:"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo "3. Or start in production mode:"
echo -e "   ${YELLOW}npm start${NC}"
echo ""
echo "4. Test the API:"
echo -e "   ${YELLOW}./test-api.sh${NC}"
echo ""
echo "For deployment to IONOS, see:"
echo -e "   ${YELLOW}DEPLOYMENT.md${NC}"
echo ""
