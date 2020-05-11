FROM node:12.16.3-buster as builder

ARG api_url
ENV REACT_APP_API_URL=$api_url
ENV GENERATE_SOURCEMAP=false

WORKDIR /usr/arc/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/arc/app/build /usr/share/nginx/html
