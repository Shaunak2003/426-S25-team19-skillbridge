FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5002

CMD ["npx", "ts-node", "index.ts"]
