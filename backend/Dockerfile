FROM node:14.20-buster
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .

RUN yarn install --pure-lockfile

# Copy app files
COPY . .
# Expose port
EXPOSE 5000
# Start the app
CMD [ "yarn", "start" ]