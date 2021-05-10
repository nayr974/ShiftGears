# base image
FROM node:14 as build-deps

# set working directory
ENV NODE_ROOT /usr/src/app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install
ENV GENERATE_SOURCEMAP=false
RUN npm run build

FROM nginx

FROM nginx:1.15-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
