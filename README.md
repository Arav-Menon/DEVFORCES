<div align="center">
  <img src="./apps/web2/public/logo.png" alt="DevForce Logo" width="300"/>

  <p>The high-performance, real-time coding assessment and competitive programming platform.</p>

  <p>
    <a href="#about"><strong>About</strong></a> ·
    <a href="#quick-start"><strong>Quick Start</strong></a> ·
    <a href="#architecture"><strong>Architecture</strong></a> ·
    <a href="#deployment"><strong>Deployment</strong></a>
  </p>
</div>

<br/>

## About

DevForce is a modern, distributed competitive programming and code evaluation platform. Designed for scale and low-latency feedback, it provides a comprehensive environment for hosting coding challenges, evaluating submissions in secure sandboxes, and maintaining real-time leaderboards. 

## System Architecture

The platform is designed as a distributed monorepo utilizing a microservices architecture to ensure high availability and horizontal scalability.

* **API Gateway & Core Logic:** Handles user authentication, contest management, and submission routing.
* **Code Evaluator:** A secure, isolated execution environment for compiling and testing user code against predefined test cases.
* **Worker Nodes:** Background processors that handle asynchronous tasks seamlessly.
* **Realtime Service:** A WebSocket-based streaming service ensuring live updates for submissions and contest status.
* **Leaderboard Engine:** A high-throughput service dedicated to rank aggregations and scoring calculations.
* **Cron Worker:** Manages scheduled events, contest lifecycles, and periodic cleanup tasks.

## Tech Stack

The repository is structured as a Turborepo monorepo, optimized for fast, reliable builds and shared internal packages.

* **Runtime & Tooling:** Bun, Turborepo, TypeScript
* **Frontend:** Next.js (React), Tailwind CSS, Shadcn UI
* **Backend:** Bun, Express
* **Database & ORM:** PostgreSQL, Prisma
* **Caching & Message Broker:** Redis, Redis Streams
* **Containerization:** Docker, Docker Compose
* **CI/CD & Deployment:** GitHub Actions, AWS ECS

## Quick Start

### Prerequisites

Ensure you have the following installed on your local machine:
* [Bun](https://bun.sh/) (v1.3.1+)
* [Docker](https://www.docker.com/) and Docker Compose
* Git

### Local Development Environment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arav-Menon/DEVFORCES.git
   cd DEVFORCES
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Configure environment variables:**
   Copy the example environment files and update them with your local configurations.
   ```bash
   cp .env.example .env
   ```

4. **Start the infrastructure services:**
   Start the local PostgreSQL and Redis instances utilizing Docker Compose.
   ```bash
   docker compose up -d postgres redis
   ```

5. **Initialize the database:**
   Generate the Prisma client and run migrations.
   ```bash
   bun run --filter @repo/db prisma:generate
   bun run --filter @repo/db prisma:migrate
   ```

6. **Start the development servers:**
   Run all applications concurrently.
   ```bash
   bun dev
   ```

## Repository Structure

```text
.
├── apps/
│   ├── api/                 # Core backend API
│   ├── admin-backend/       # Administrative management API
│   ├── web2/                # Primary user-facing Next.js application
│   ├── realtime/            # WebSocket server for live updates
│   ├── evaluator/           # Secure code execution engine
│   ├── worker/              # Background job processor
│   ├── leaderboard-worker/  # Ranking and scoring service
│   └── cron-worker/         # Scheduled task processor
├── packages/
│   ├── db/                  # Prisma schema, migrations, and database client
│   ├── redis-stream/        # Shared Redis utility and connection logic
│   ├── common/              # Shared types, constants, and observability tools
│   ├── ui/                  # Shared React components (Shadcn UI)
│   ├── eslint-config/       # Shared linting rules
│   └── typescript-config/   # Shared tsconfig definitions
└── Dockerfiles/             # Production multi-stage Dockerfiles for all services
```

## Deployment

DevForce is containerized and production-ready for deployment on AWS ECS (Elastic Container Service) or any compatible orchestrator. 

### Containerization Strategy

Each service has a dedicated, multi-stage Dockerfile located in the `/Dockerfiles` directory. The build process is optimized for minimal final image size by leveraging cached dependency layers and executing Prisma generation during the build stage.

Example build command for the API service:
```bash
docker build -t devforce-api:latest -f ./Dockerfiles/Dockerfile.api .
```

### Continuous Integration

The repository uses GitHub Actions for CI/CD across all microservices. The pipeline automatically authenticates with Docker Hub, builds the affected services using Turborepo's dependency graph, and pushes the tagged images to the container registry.

## License

Copyright © 2026 DevForce. All rights reserved.
