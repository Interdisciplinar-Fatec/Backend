FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "npm run migrate && npm run createAdmin && npm run start"]
