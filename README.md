# Company Directory Web Application

This project is a web application that displays a list of companies and their details, including multiple possible locations. The application uses a Python backend API (Django) and a React frontend with map integration, and it is containerized using Docker.

## Project Overview

This project aims to provide an easy-to-use interface to view company information and their respective locations on a map. The application allows users to:
- View a list of companies.
- Search for companies by name.
- View details of a specific company, including a map showing its main location and other possible locations.
- Interact with the locations on the map.

## Features

- **Company List Page**: Displays a searchable list of companies.
- **Company Details Page**: Shows detailed information about a selected company and a map with its locations.
- **Map Integration**: Uses Leaflet to display company locations on a map.
- **Dockerized**: The application is containerized using Docker for easy setup and deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/company-directory.git
cd company-directory
