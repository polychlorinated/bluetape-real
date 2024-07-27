FROM node:16-buster as build

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:16-buster

WORKDIR /app

COPY --from=build /app/build ./build
RUN npm install -g serve

ENV PORT=10000
EXPOSE $PORT

CMD ["sh", "-c", "serve -s build -l $PORT"]