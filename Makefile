.PHONY: dev-web build-web db-generate db-migrate infra-up infra-down build-go

# Frontend Commands (Yarn)
dev-web:
	yarn dev:web

build-web:
	yarn build:web

# Database Commands (Drizzle)
db-generate:
	yarn db:generate

db-migrate:
	yarn db:migrate

db-studio:
	yarn db:studio

# Infrastructure Commands (Docker)
infra-up:
	docker compose up -d

infra-down:
	docker compose down

# Golang Microservices Commands
build-go:
	go build tbm/auth-service/... tbm/post-service/... tbm/interaction-service/... tbm/timeline-service/...

dev-auth:
	cd services/auth-service && air

dev-post:
	cd services/post-service && air

dev-interaction:
	cd services/interaction-service && air

dev-timeline:
	cd services/timeline-service && air
