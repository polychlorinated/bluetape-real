FROM node:16-buster
ENV NODE_ENV production
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