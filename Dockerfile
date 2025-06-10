FROM node:22.16.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run migration:run
RUN npm run seed
RUN npm run build
EXPOSE ${APP_PORT}
CMD ["npm", "run", "prod"]