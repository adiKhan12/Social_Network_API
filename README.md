# Social_Network_API

This is an example web application built with Node.js, Express, and MongoDB.
## Table of Contents

- Requirements
- Installation
- Usage
- API Documentation
- Testing
- Build Automation

## Requirements

To run this project, you will need to have the following software installed on your system:

- Node.js
- MongoDB
    
## Installation

To install this project, follow these steps:

1. Clone the project from GitHub:
```
git clone https://github.com/adiKhan12/Social_Network_API.git
```
2. Install the project dependencies:
```
npm install
```
3. Create a `.env` file in the root directory of the project with the following content:
```
MONGODB_URI=mongodb://localhost/example
JWT_SECRET=example-secret
JWT_EXPIRATION_TIME=1h
```
Replace `example` with your desired database name, and example-secret with your desired JWT secret.
4. Start the project:
```
npm start
```
The project will now be running at `http://localhost:3000`.

## Usage
To use the project, you can use a web browser or a tool like cURL or Postman to make HTTP requests to the API endpoints.

## API Documentation
The project exposes the following API endpoints:
- `POST /api/auth/signup`: Creates a new user and returns a JWT token.
- `POST /api/auth/login`: Logs in a user and returns a JWT token.
- `POST /api/posts`: Creates a new post.
- `DELETE /api/posts/:id`: Deletes a post.
To use these endpoints, you must include a valid JWT token in the Authorization header of the HTTP request.
## Testing
To run the tests for this project, use the following command:
```
npm test
```
The tests are implemented using the Mocha testing framework and the Chai assertion library.
## Build Automation
To automate the build process for this project, you can use a build automation tool like Jenkins or Travis CI.

An example pipeline script for Jenkins is provided in the file `Jenkinsfile`. This script checks out the project code, installs the dependencies, runs linting and testing, builds and publishes the code, and deploys it to the desired environment.
