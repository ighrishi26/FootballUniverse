# ⚽ Football Universe

Football Universe is a full-stack football database and analytics web application built with **React** and **Django REST Framework**.

The application allows users to explore football players, clubs, competitions, transfers, football history, player comparisons, formations, relationships, and football statistics through a modern interactive interface.

---

## 🚀 Features

### 🏠 Home Dashboard

* Football Universe overview
* Database statistics
* Top scorers
* Top assist providers
* Football data highlights

### 👤 Players

* View football players
* Search players
* Filter by position, country, and club
* Sort by goals, assists, appearances, and trophies
* View detailed player profiles
* Add new players
* Edit players
* Delete players

### 🏟️ Clubs

* Browse football clubs
* Search and filter clubs
* Sort by trophies, founded year, and name
* View detailed club information
* Add, edit, and delete clubs

### 🏆 Competitions

* Browse football competitions
* Filter by competition type and country
* Sort competitions
* View competition details

### 🔄 Transfers

* Explore player transfer history
* Search transfers
* Filter by season, position, and transfer type
* Sort transfer records

### ⚔️ Player Comparison

* Select two players
* Compare goals, assists, appearances, and trophies
* Compare player profiles
* Identify statistical advantages

### 🕐 Football Timeline

* Explore important football events
* Search historical events
* Filter by category
* Sort events by year

### 📋 Formation Builder

* Create football formations
* Select player positions
* Build a football lineup

### 🌍 Explore

* Search across the football database
* Search players, clubs, competitions, and transfers
* Filter results by category

### 📊 Analytics

* Player statistics
* Goal analysis
* Assist analysis
* Club trophy statistics
* Competition analysis
* Player position distribution
* Transfer statistics
* Interactive charts

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Recharts
* Lucide React
* CSS

### Backend

* Python
* Django
* Django REST Framework
* django-cors-headers

### Database

* SQLite

### Development Tools

* Visual Studio Code
* Git
* GitHub
* PowerShell

---

## 📁 Project Structure

```text
FootballUniverse/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── data/
│   │   │   └── footballData.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Players.jsx
│   │   │   ├── PlayerDetails.jsx
│   │   │   ├── PlayerForm.jsx
│   │   │   ├── Clubs.jsx
│   │   │   ├── ClubDetails.jsx
│   │   │   ├── ClubForm.jsx
│   │   │   ├── Competitions.jsx
│   │   │   ├── CompetitionDetails.jsx
│   │   │   ├── Transfers.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── TimelinePage.jsx
│   │   │   ├── Formations.jsx
│   │   │   ├── Explore.jsx
│   │   │   └── Analytics.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── football/
│   ├── venv/
│   ├── manage.py
│   ├── db.sqlite3
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ighrishi26/FootballUniverse.git
cd FootballUniverse
```

---

## 🎨 Frontend Setup

Open a terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🐍 Backend Setup

Open another terminal:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start Django:

```bash
python manage.py runserver
```

The backend will run on:

```text
http://127.0.0.1:8000
```

---

## 🔗 API Endpoints

| Endpoint             | Description          |
| -------------------- | -------------------- |
| `/api/`              | API status           |
| `/api/players/`      | Players              |
| `/api/clubs/`        | Clubs                |
| `/api/competitions/` | Competitions         |
| `/api/transfers/`    | Transfers            |
| `/api/timeline/`     | Timeline events      |
| `/api/dashboard/`    | Dashboard statistics |

---

## 🔄 Application Workflow

```text
User
  ↓
React Frontend
  ↓
Axios API Requests
  ↓
Django REST Framework
  ↓
Django Models
  ↓
SQLite Database
  ↓
API Response
  ↓
React UI
```

The React frontend communicates with the Django backend using REST APIs. Django handles database operations through its models and Django REST Framework serializers and viewsets.

---

## 💾 Database Models

The backend contains the following main models:

* **Player**
* **Club**
* **Competition**
* **Transfer**
* **TimelineEvent**

Relationships are handled using Django model relationships such as the player-to-club foreign key.

---

## ✨ CRUD Operations

The application supports CRUD operations for major database entities.

**Create**

* Add players
* Add clubs

**Read**

* View players
* View clubs
* View competitions
* View transfers
* View timeline events

**Update**

* Edit players
* Edit clubs

**Delete**

* Delete players
* Delete clubs

---

## 📊 Analytics

The Analytics section uses **Recharts** to visualize football data through interactive charts.

Examples include:

* Goals by player
* Assists by player
* Club trophies
* Competition distribution
* Player position distribution
* Transfer statistics

---

## 🎯 Project Goals

The main goals of Football Universe are:

* Build a complete full-stack application
* Practice React component development
* Implement REST API communication
* Learn Django REST Framework
* Work with relational database models
* Implement CRUD functionality
* Create data filtering and search functionality
* Build interactive football analytics
* Develop a scalable project structure

---

## 🔮 Future Improvements

Possible future improvements include:

* PostgreSQL database
* Live football match data
* Live league standings
* Real-time transfer updates
* Advanced player statistics
* User profiles and favorites
* Authentication and authorization
* Football news integration
* Improved mobile responsiveness
* Advanced formation tactics

---

## 👨‍💻 Author

**Hrishi Pacharne**

MCA Student & Software Developer

---

## 📄 License

This project was created for educational, portfolio, and development purposes.
