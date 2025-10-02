# Build stage
FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./

# force install sesuai platform Linux
RUN npm install --platform=linux --force

COPY . .
RUN npm run build

# Run stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]
