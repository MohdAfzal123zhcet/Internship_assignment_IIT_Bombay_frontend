# Step 1: Build Vite App
FROM node:20-alpine AS build

WORKDIR /app

# Copy only necessary files for caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Serve using nginx
FROM nginx:alpine

# Copy build output to nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Add nginx config for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
