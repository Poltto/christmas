FROM docker.io/node:16
WORKDIR /app
COPY package.json /app/
RUN yarn install
COPY [^src]* /app/
CMD ["yarn", "build"]

