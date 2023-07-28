FROM node:19.3
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g migrate-mongo
COPY . ./
ENV PORT 3000
ARG tag="latest"
ENV TAG=${tag}
EXPOSE ${PORT}
CMD ["npm", "run", "start"]