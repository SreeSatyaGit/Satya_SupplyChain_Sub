# Company Directory Application

## Overview

This is a web application that displays a list of companies and their details, including multiple possible locations. The application has a Python backend API using Django and a React frontend with a two-page structure and map integration. The application is containerized using Docker.

## Features

- Display a list of companies
- Display company details, including multiple possible locations
- Map integration using Leaflet to show company locations
- Search functionality to filter companies by name
- Responsive design for both desktop and mobile views

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python (version 3.9 or later)
- Node.js and npm
- Docker and Docker Compose

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Satya_SupplyChain_Sub/company-directory.git
cd company-directory
```
### Step 2: Backend Installation

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

pip install -r backend/requirements.txt #Install Django
```
### Step 3: Frontend Setup

```bash
cd myapp
npm install
npm run build
```
### Step 4: Docker Setup

```bash
docker-compose up --build
```

## Running Application
```
docker-compose up
http://localhost:3000
```
## Testing
```
npm test # In myapp folder to test the UI code

```

## Project Structure
```bash
.
├── backend
│   ├── company_directory
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── wsgi.py
│   ├── companies
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   └── views.py
│   ├── db.sqlite3
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   
|── dataFiles
│       ├── companies.csv
│       └── locations.csv
|── frontend
│       ├── .env.docker
│       └── Dockerfile
|       └── nginx.conf
├── myapp
│   ├── build
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── CompanyDetails.css
│   │   ├── CompanyDetails.js
│   │   ├── CompanyList.css
│   │   ├── CompanyList.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── package.json
│   
│   
├── docker-compose.yml
└── README.md
```

