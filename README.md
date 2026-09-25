# Health Check API — Dockerized Node.js App with CI/CD

A simple Node.js/Express application with health-check endpoints, containerized with Docker and deployed via an automated CI/CD pipeline to AWS EC2.

## What This Project Demonstrates

- **Docker**: Application packaged as a container for consistent deployment across environments
- **CI/CD with GitHub Actions**: Every push to `main` automatically builds a new Docker image, pushes it to Docker Hub, and redeploys it on the live server
- **Automated Deployment**: Zero manual steps between writing code and seeing it live

## Tech Stack

- Node.js + Express
- Docker
- GitHub Actions
- Docker Hub (image registry)
- Deployed on AWS EC2 (see companion repo: [health-check-app-infra](https://github.com/jyoti7878/health-check-app-infra) for the Terraform infrastructure code)

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Welcome message |
| `GET /health` | Returns app status, uptime, and timestamp — used for health monitoring |

## How the CI/CD Pipeline Works

```
Developer pushes code to GitHub (main branch)
        │
        ▼
GitHub Actions triggers automatically
        │
        ▼
Docker image built from Dockerfile
        │
        ▼
Image pushed to Docker Hub
        │
        ▼
GitHub Actions SSHs into the AWS EC2 server
        │
        ▼
Server pulls the new image and restarts the container
        │
        ▼
Updated app is live — no manual intervention
```

## Running Locally

```bash
npm install
node app.js
```
Visit `http://localhost:3000/health`

## Running with Docker

```bash
docker build -t health-check-app .
docker run -p 3000:3000 health-check-app
```

## CI/CD Setup

The workflow (`.github/workflows/docker-build.yml`) uses these GitHub Secrets:
- `DOCKER_USERNAME` / `DOCKER_PASSWORD` — Docker Hub credentials
- `EC2_HOST` — public IP of the deployment server
- `EC2_SSH_KEY` — private SSH key for connecting to the server

## What I Learned / Debugged

- Diagnosed and fixed an AMI mismatch issue where startup scripts used Amazon Linux commands (`yum`) on an Ubuntu server, by reading `cloud-init` logs and correcting to `apt-get`
- Set up secure SSH-based deployment using key pairs instead of passwords
- Understood the difference between build-time (Docker image creation) and deploy-time (server-side container restart) automation
