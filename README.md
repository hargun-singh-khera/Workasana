# TaskZen Frontend

TaskZen is a task management dashboard built for teams that need a simple way to organize work, track ownership, and monitor progress. This repository contains the React frontend for TaskZen, including authentication screens, project and task workflows, team management, reporting charts, and settings for managing core workspace data.

The app connects to a deployed Workasana backend API and uses JWT-based authentication to protect the main dashboard experience.

---

## Demo Link

Live Demo: `https://taskzen-henna.vercel.app`

Backend API: `https://workasana-backend-wheat.vercel.app`

---

## Login

You can create a new account from the signup page, then log in with the registered email and password.

---

## Quick Start

```bash
git clone https://github.com/hargun-singh-khera/TaskZen.git
cd TaskZen
npm install
npm run dev
```

The development server will start on the Vite local URL, usually:

```bash
http://localhost:5173
```

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Technologies

- React JS
- Vite
- React Router
- Bootstrap
- Bootstrap Icons
- Chart.js
- React Chart.js 2
- React Hot Toast
- React Select
- JWT authentication

---

## Features

### Authentication

- User signup and login
- JWT token stored on successful login
- Protected dashboard route for authenticated users
- Login form validation and user feedback with toast notifications

### Dashboard

- View all projects and tasks in one place
- Search projects and tasks by keyword
- Filter projects by status
- Filter tasks by status
- Create new projects and tasks from modal forms
- Navigate directly to project and task details

### Projects

- View project details with related tasks
- Create tasks inside a selected project
- Filter project tasks by status
- Sort tasks by priority and due date
- View task owners with compact avatar groups

### Tasks

- View full task details, including project, team, owners, tags, status, and estimated completion time
- Mark a task as completed
- Create tasks with project, team, owner, tag, priority, status, and due date data

### Teams

- View all teams
- Create new teams
- View team members
- Add members to an existing team
- Open team details from the team listing page

### Reports

- Visual reports using pie charts
- Completed vs pending tasks from the last week
- Pending and completed work duration
- Tasks closed by team
- Tasks closed by owner
- Tasks closed by project

### Settings

- Manage projects, tasks, teams, and tags
- Add new tags
- Delete existing workspace records from a central settings screen

---

## Project Structure

```bash
src
|-- components
|   |-- Modal
|   |   |-- AddMember.jsx
|   |   |-- AddProject.jsx
|   |   |-- AddTag.jsx
|   |   |-- AddTask.jsx
|   |   |-- AddTeam.jsx
|   |   |-- DeleteAction.jsx
|   |   `-- EditProject.jsx
|   |-- AvatarGroup.jsx
|   |-- Badge.jsx
|   `-- Sidebar.jsx
|-- pages
|   |-- Dashboard.jsx
|   |-- Login.jsx
|   |-- Project.jsx
|   |-- Reports.jsx
|   |-- Settings.jsx
|   |-- Signup.jsx
|   |-- TaskDetails.jsx
|   |-- TeamDetails.jsx
|   `-- Teams.jsx
|-- useFetch.jsx
|-- main.jsx
`-- index.css
```

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Login page |
| `/signup` | User registration page |
| `/dashboard` | Main dashboard with projects and tasks |
| `/project/:projectId` | Project details and project-specific tasks |
| `/task/:taskId` | Task details page |
| `/teams` | Team listing page |
| `/teams/:teamId` | Team details page |
| `/reports` | Analytics and reporting dashboard |
| `/settings` | Workspace data management |

---

## Backend

This frontend is connected to a separate Workasana backend API. Backend setup, environment variables, database configuration, and endpoint documentation should be maintained in the backend repository README.

---

## Contact

For bugs, suggestions, or feature requests, please reach out to hargunsinghkhera8@gmail.com.
