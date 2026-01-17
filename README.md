# Neraxis CRM
Neraxis CRM is a responsive full-stack CRM application for managing leads and sales agents with complete CRUD functionality and an intuitive interface.

Build with React Frontend, Express/Node backend, MongoDB database and React Router.

## Demo Link

[Live Demo](https://neraxis-crm-app.vercel.app)

##  Quick Start

```
git clone https://github.com/ankitsahucodes/neraxis-app.git
cd neraxis-app
npm install
npm run dev
```
## Environment Setup
Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```
#### Required Keys:<br>
PORT – Port on which the server runs<br>
MONGODB_URI – MongoDB connection string

---
## Technologies
- React JS
- React Router
- Chart.js
- Node.js
- Express
- MongoDB

## Demo Video

Watch a 4-minute walkthrough of all major features:<br>
[Watch Demo](https://drive.google.com/file/d/1wT2gbkUMgGH2mKiaM_l0GckRytI2lOij/view?usp=sharing)

## Features
**Dashboard**
- Displays names of all leads
- Lead Filter by Status
- Add New Lead Button

**Leads**
- Displays list of all leads
- Filter leads by status or agent
- Sort leads by priority or time to close

**Lead Management**
- Displays list of all leads

**Sales Agent**
- Displays a list of all the sales agent
- Add New Sales Agent Button.

**Leads by Agents**
- Display leads by assigned agents
- Filter by status and time to close

**Lead Details**
- Display lead details with edit button
- Displays all comments
- Input box to add new comments

**Add Agent**
- Form to add a new Agent

**Add Lead**
- Form to add a new Lead

**Report**
- Total closed Leads and Leads in Pipeline
- Leads Closed by Sales Agent
- Lead Status Distribution

**Settings**
- Delete leads or agents

## API Reference

### **Sales Agents**

### GET /agents
Get all sales agents  
**Sample Response:**
```
[{ _id, name, email, ... }]
```

### GET /agents/:id
Get sales agent details  
**Sample Response:**
```
{ _id, name, email, ... }
```

### POST /agents

Create a new sales agent  
**Sample Response:**
```
{ _id, name, email, ... }
```

### DELETE /agents/:id
Delete a sales agent  
**Sample Response:**
```
{ message, agent }
```
### **Leads**

### GET /leads
Get all leads  
**Sample Response:**
```
[{ _id, name, source, salesAgent, status, tags, ... }]
```

### GET /leads/:id
Get lead details  
**Sample Response:**
```
{ _id, name, source, salesAgent, status, tags, ... }
```

### POST /leads
Create a new lead  
**Sample Response:**
```
{ _id, name, source, status, ... }
```

### PUT /leads/:id
Update a lead  
**Sample Response:**
```
{ _id, name, status, updatedAt, ... }
```

### DELETE /leads/:id
Delete a lead  
**Sample Response:**
```
{ message, lead }
```
### Comments

### GET /leads/:id/comments
Get all comments for a lead  
**Sample Response:**
```
[{ _id, author, commentText, createdAt, ... }]
```

### POST /leads/:id/comments
Add a comment to a lead  
**Sample Response:**
```
{ _id, author, commentText, ... }
```

Reports

### GET /report/pipeline
Get total leads in pipeline  
**Sample Response:**
```
{ totalLeadsInPipeline }
```

### GET /report/pipeline/closed
Get total closed leads  
**Sample Response:**
```
{ totalClosedInPipeline }
```

### GET /report/last-week
Get leads closed in last 7 days  
**Sample Response:**
```
{ totalClosedLastWeek }
```

### GET /report/closed-by-agent
Get closed leads grouped by sales agent  
**Sample Response:**
```
[{ agentName, count }]
```
## Contact

For bugs or feature requests, please reach out to ankitsahu2829@gmail.com
