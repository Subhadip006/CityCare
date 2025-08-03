
![Logo](https://res.cloudinary.com/debj4rp45/image/upload/v1754203692/CityCare_1_-removebg-preview_1_tbg3jh.png)


# CityCare: Public Complaint Management System

CityCare is a civic engagement platform that empowers citizens to report issues in their community, track complaint progress, and collaborate with local authorities to improve their neighborhoods.


# Badges

![License](https://img.shields.io/badge/license-MIT-blue)

![Last commit](https://img.shields.io/github/last-commit/Subhadip006/CityCare)

![Stars](https://img.shields.io/github/stars/Subhadip006/CityCare?style=social)




## Features


- **Raise Complaints** — Submit detailed reports with descriptions, images.
- **Track Status** — Monitor your complaint’s progress in real time.
- **Department Routing** — Complaints are automatically assigned to relevant departments (roads, sanitation, power, etc.).
- **Officer Dashboard** — Dedicated portal for municipal officers to view and resolve complaints.
- **User Dashboard** — View submitted complaints, and check updates.
- **Authentication** — Secure login via email/password and Google Sign-In.
- **Responsive UI** — Modern, mobile-friendly interface built with Tailwind CSS and Lucide Icons.
- **Media Uploads** — Upload images to Cloudinary for better issue documentation.
- **Map Integration** — Pin complaint locations using Leaflet maps.
- **Admin Dashboard** - Unified Dashboard for accepting or rejecting officers request, and to view to total, pending, resolved complaints.

## Poject Structure

```
citycare/
├── client/         # React frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/         # Go Fiber backend
│   ├── cmd/
│   ├── pkg/
│   │   ├── handlers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── db/
│   └── ...
├── docker-compose.yml
└── README.md

```
## Tech Stack

**Client:** 

- [React](https://reactjs.org/) (Vite)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)
- [Leaflet](https://leafletjs.com/)

**Server:** 

- [Go](https://golang.org/) (Fiber framework)
- [GORM](https://gorm.io/) — ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/) — Media storage
- JWT Authentication
- Google OAuh

**Deployment:**

- Dockerized (Frontend + Backend + PostgreSQL)
- Hosted on [Render](https://render.com/) (backend) and [Vercel](https://vercel.com/) (frontend)
- Nginx reverse proxy
- PostgreSQL hosted on [NeonDB](https://neon.com)

### Installation

- Clone [CityCare](https://github.com/Subhadip006/CityCare)
- cd CityCare

#### Run with docker 
```
docker compose up -- build

```

#### Run without docker

##### Backend

```

cd server
go mod tidy
go run cmd/main.go

```

##### Frontend

```

cd client
npm install
npm run dev

```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Server/.env

```
JWT_SECRET=
RESEND_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
DATABASE_URL=
APP_BASE_URL=http://localhost:8000/    #used by resend to send mail


```

#### Client/.env

###### For Docker

```
VITE_GOOGLE_CLIENT_ID =   #please generate one from the google cloud console
VITE_API_BASE_URL = http://localhost:8000

```
###### Without Docker

```
VITE_GOOGLE_CLIENT_ID = 
VITE_API_BASE_URL = http://localhost:8000
 ```

## Images

![Image 1](https://res.cloudinary.com/debj4rp45/image/upload/v1754202653/Screenshot_2025-08-03_at_12-00-44_CityCare_efhqrc.png)

---

![Image 2](https://res.cloudinary.com/debj4rp45/image/upload/v1754202639/Screenshot_2025-08-03_at_12-00-30_CityCare_iv7naw.png)
---

![Image 3](https://res.cloudinary.com/debj4rp45/image/upload/v1754202669/Screenshot_2025-08-03_at_12-00-59_CityCare_fix0rs.png)

---

![Image 4](https://res.cloudinary.com/debj4rp45/image/upload/v1754202686/Screenshot_2025-08-03_at_12-01-18_CityCare_qzoiq8.png)

---

![Image 5](https://res.cloudinary.com/debj4rp45/image/upload/v1754202700/Screenshot_2025-08-03_at_12-01-32_CityCare_h9w4ku.png)

---
## License

[MIT](https://choosealicense.com/licenses/mit/)

