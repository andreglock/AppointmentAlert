FROM node:16 as build
WORKDIR /workdir
COPY . .
RUN mv -f src/endpoint_prod.json src/endpoint.json
RUN npm install
RUN npm run build

FROM nginx as app
COPY --from=build /workdir/build/ /usr/share/nginx/html/
