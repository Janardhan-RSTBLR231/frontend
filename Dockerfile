FROM node:14.15.5-alpine AS builder
COPY . ./daikin-checksheetportal-frontend
WORKDIR /daikin-checksheetportal-frontend
RUN npm i
ARG CONFIGURATION=dev
RUN $(npm bin)/ng build --configuration $CONFIGURATION

FROM nginx:1.15.8-alpine
COPY --from=builder /daikin-checksheetportal-frontend/dist/ /usr/share/nginx/html
