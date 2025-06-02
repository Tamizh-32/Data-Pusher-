
# Data Pusher

## Overview

Data Pusher is a Node.js Express web application that allows accounts to receive JSON data and forward it to multiple destination platforms via webhooks. Each account can have multiple destinations configured with URLs, HTTP methods, and headers. The app securely identifies accounts using an app secret token.

---

## Features

- Account management (Create, Read, Update, Delete)
- Destination management for each account (Create, Read, Update, Delete)
- Forwarding incoming JSON data to all configured destinations per account
- Supports GET, POST, and PUT HTTP methods for destinations
- Uses SQLite for lightweight data storage

---

## Technologies Used

- Node.js (latest version)
- Express.js
- Sequelize ORM
- SQLite database
- Axios (for HTTP requests)

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (comes with Node.js)
- Git (optional, for cloning the repo)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Tamizh-32/Data-Pusher-.git
cd data-pusher-




npm install
npm start

The server will run on http://localhost:3000.

Project Structure
/models       - Sequelize models (Account, Destination)
/controllers  - Request handlers for API endpoints
/routes       - Express route definitions
/utils        - Utility functions (e.g., token generator)
app.js       - Main application entry point
database.sqlite - SQLite database file (auto-generated)

API Endpoints


Account Module
POST /account
Create a new account
Body: json
{
  "email": "user@example.com",
  "accountName": "My Account",
  "website": "https://example.com"  // optional
}


GET /account/:id
Get account details by ID

PUT /account/:id
Update account details by ID

DELETE /account/:id
Delete account and its destinations by ID



Destination Module
POST /destination/:accountId
Add a new destination for an account
Body:
json
{
  "url": "https://webhook.site/your-id",
  "httpMethod": "POST",
  "headers": {
    "APP_ID": "1234APPID1234",
    "APP_SECRET": "super-secret",
    "ACTION": "user.update",
    "Content-Type": "application/json"
  
}
GET /destination/:accountId
List all destinations for an account

PUT /destination/:id
Update destination by ID

DELETE /destination/:id
Delete destination by ID



Data Handler Module
POST /server/incoming_data
Receive JSON data and forward it to all destinations of the account identified by the app secret token
Headers:
makefile
CL-X-TOKEN: <appSecretToken>
Body:
Any JSON object



Testing the Application
Use Postman or Thunder Client to test APIs.

Create an account using the /account endpoint.

Add one or more destinations using /destination/:accountId.

Send POST requests to /server/incoming_data with header CL-X-TOKEN set to the account's app secret token and any JSON data in the body.

Verify forwarded data at destination URLs (use services like webhook.site).



Notes
The SQLite database file (database.sqlite) is created automatically in the project root.

The app secret token is automatically generated when an account is created.

Deleting an account deletes all associated destinations.

Destinations with HTTP GET method will receive data as query parameters.

Destinations with POST/PUT methods will receive data as JSON body.

License
This project is open source and free to use.




Contact
For questions or support, contact: tamizharasan2000k@gmail.com


