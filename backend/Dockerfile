FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache curl
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
