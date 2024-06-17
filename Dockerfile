FROM mirror.gcr.io/node:21-alpine
WORKDIR /app

COPY . .
RUN npm install -g @vue/cli
RUN npm install
CMD npm run dev