FROM node:alpine as development

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --ignore-scripts

COPY . .
RUN yarn build

EXPOSE 3100

CMD ["node", "/app/dist/main"]

