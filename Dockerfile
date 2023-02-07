FROM node:18.13.0-alpine3.16 as builder
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node
WORKDIR /home/node
COPY app/ ./app
COPY index.ts .
COPY ["tsconfig.prod.json", "."]
COPY ["package.json", "package-lock.json", "./"]
RUN chmod -R 777 /root
RUN mkdir -p /root/.npm
RUN chown -R root:root /root/.npm
RUN chmod -R 777 /root/.npm
RUN npm install
RUN npm run build
RUN chown -R node:node ./build



FROM node:18.13.0-alpine3.16
RUN mkdir -p /home/node/app && chown -R node:node /home/node
RUN apk add --no-cache tini
USER node
WORKDIR /home/node
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --production
ENV NODE_ENV production
COPY --from=builder /home/node/build ./app
COPY [".env", "./"]
EXPOSE 9097
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "app/index.js"]
