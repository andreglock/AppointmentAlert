FROM node:16 as build
WORKDIR /workdir
COPY . .
RUN mv -f src/endpoint_prod.josn src/endpoint.josn
RUN npm install
RUN npm run build

FROM nginx as app
COPY --from=build /workdir/build/ /usr/share/nginx/html/
