#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# API URL (change this to your production URL when deployed)
API_URL="${1:-http://localhost:3000}"

echo "========================================="
echo "CyberWave API Test Script"
echo "========================================="
echo "Testing API at: $API_URL"
echo ""

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
echo "GET $API_URL/health"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/health")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo -e "${RED}✗ Health check failed (HTTP $HTTP_CODE)${NC}"
    echo "$BODY"
fi
echo ""

# Test 2: Root Endpoint
echo -e "${YELLOW}Test 2: Root Endpoint${NC}"
echo "GET $API_URL/"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ Root endpoint accessible${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo -e "${RED}✗ Root endpoint failed (HTTP $HTTP_CODE)${NC}"
    echo "$BODY"
fi
echo ""

# Test 3: Contact Form Submission (Valid)
echo -e "${YELLOW}Test 3: Contact Form Submission (Valid)${NC}"
echo "POST $API_URL/api/contact/submit"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/contact/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "message": "This is a test message from the API test script."
  }')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "201" ]; then
    echo -e "${GREEN}✓ Contact form submission successful${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo -e "${RED}✗ Contact form submission failed (HTTP $HTTP_CODE)${NC}"
    echo "$BODY"
fi
echo ""

# Test 4: Contact Form Validation (Invalid Email)
echo -e "${YELLOW}Test 4: Contact Form Validation (Invalid Email)${NC}"
echo "POST $API_URL/api/contact/submit"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/contact/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "message": "This should fail"
  }')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}✓ Validation working correctly${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo -e "${RED}✗ Validation test unexpected result (HTTP $HTTP_CODE)${NC}"
    echo "$BODY"
fi
echo ""

# Test 5: Contact Form Validation (Missing Required Fields)
echo -e "${YELLOW}Test 5: Contact Form Validation (Missing Fields)${NC}"
echo "POST $API_URL/api/contact/submit"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/contact/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User"
  }')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}✓ Required field validation working${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo -e "${RED}✗ Required field validation unexpected result (HTTP $HTTP_CODE)${NC}"
    echo "$BODY"
fi
echo ""

# Test 6: 404 Not Found
echo -e "${YELLOW}Test 6: 404 Handler${NC}"
echo "GET $API_URL/non-existent-endpoint"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/non-existent-endpoint")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${GREEN}✓ 404 handler working${NC}"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo -e "${RED}✗ 404 handler unexpected result (HTTP $HTTP_CODE)${NC}"
    echo "$BODY"
fi
echo ""

echo "========================================="
echo "Test Summary Complete"
echo "========================================="
echo ""
echo "Note: To test rate limiting, run this script multiple times quickly."
echo "After 5 contact submissions within 15 minutes, you should receive a 429 error."
