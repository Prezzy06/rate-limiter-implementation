# === Stage 1: Build the React app ===
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# === Stage 2: Serve with development server ===
EXPOSE 5173
CMD ["npm", "run", "dev"]
