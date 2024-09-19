FROM alpine:3 as downloader

ARG TARGETOS
ARG TARGETARCH
ARG TARGETVARIANT
ARG VERSION

ENV BUILDX_ARCH="${TARGETOS:-linux}_${TARGETARCH:-amd64}${TARGETVARIANT}"

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && unzip pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && chmod +x /pocketbase

# --------

FROM node:21 as vue-builder

WORKDIR /app/ui

COPY . .

RUN npm i && npm run build

# --------

FROM alpine:3
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

COPY public/images /pb_public/images
COPY public/favicon.ico /pb_public/.
COPY pb/hooks /pb_hooks
COPY pb/migrations /pb_migrations

EXPOSE 8090

COPY --from=downloader /pocketbase /usr/local/bin/pocketbase
COPY --from=vue-builder /app/ui/dist /pb_public

ENTRYPOINT ["/usr/local/bin/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--publicDir=/pb_public", "--hooksDir=/pb_hooks"]