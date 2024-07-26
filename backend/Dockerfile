FROM node:16-buster

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package*.json ./

RUN npm ci

# Copy app files
COPY . .

# Expose port (use the PORT environment variable set by Render)
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]