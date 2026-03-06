# ZCloud

ZCloud is a self-hosted cloud storage web application that allows users to upload, organize, and download files through a web interface. It was built as a full-stack project to explore backend infrastructure, containerization, and deployment workflows while providing a simple alternative to commercial cloud storage services.

---

## Features

* User authentication (signup and login)
* Upload and download files
* Folder creation and organization
* Web interface for browsing stored files
* Self-hosted deployment
* Dockerized backend
* CI/CD style auto-deployment using bash scripts
* Reverse proxy using Nginx

---

## Tech Stack

**Frontend**

* React (Vite)
* JavaScript
* TailwindCSS
* zustand

**Backend**

* Node.js
* Express

**Database**

* PostgreSQL

**Infrastructure**

* Docker
* Docker Compose
* Nginx
* Bash scripts for CI/CD
* GitHub repository with deploy keys

---

## Architecture

ZCloud is structured as a typical full-stack application.

```
Client (React)
        |
        v
     Nginx
        |
        v
Express Backend (Docker)
        |
        v
   PostgreSQL
```

### Components

**Frontend**

* React application compiled into static files
* Served through Nginx

**Backend**

* Express REST API
* Handles authentication, file uploads, and metadata

**Database**

* PostgreSQL stores:

  * users
  * file metadata
  * folder structure
  * file contents

**Server**

* Nginx serves the frontend
* API requests are proxied to the backend container

---

## Deployment

The project is designed to run on a single Linux server.

Deployment flow:

1. Server checks the Git repository for updates
2. If changes are detected:
3. Backend Docker image is rebuilt
4. Containers are restarted using Docker Compose
5. Frontend is rebuilt and served via Nginx

This creates a simple self-hosted CI/CD pipeline.

---

## Environment Variables

Environment variables are stored on the server and not committed to the repository.

Example backend environment file:

```
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/zcloud
JWT_SECRET=your_secret
```

Frontend environment variables are injected during the build process.

---

## Running Locally

Clone the repository:

```
git clone https://github.com/yourusername/zcloud.git
cd zcloud
```

Install dependencies:

```
npm install
```

Run backend:

```
npm start
```

Run frontend:

```
npm run dev
```

---

## Docker

Build backend image:

```
docker build -t zcloud-backend .
```

Run container:

```
docker run -p 5000:5000 zcloud-backend
```

Using Docker Compose:

```
docker compose up --build
```

---

## License

This project is for educational and personal use.
