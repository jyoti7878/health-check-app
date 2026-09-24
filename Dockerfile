# Base image - lightweight Node.js version
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for build caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Port the app runs on
EXPOSE 3000

# Command that runs when the container starts
CMD ["node", "app.js"]