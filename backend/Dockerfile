FROM node:16-buster

# The NODE_ENV will be set by Render, so we can remove this line
# ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy app files
COPY . .

# Expose port (use the PORT environment variable set by Render)
EXPOSE $PORT

# Start the app
CMD ["yarn", "start"]