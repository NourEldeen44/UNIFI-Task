# UNIFI-Task

## This is a Node.js Server Created using Express.js and using MongoDB as a Database

### to start please download the repo and run the command "npm install" and Provide .env file with the following variables ( PORT:"port number" , JWT_SECRET:"jwt secrect value" , DB_URI:"mongo db uri") and then run the command "npm start" to start the server.

## Note: there is a postman exported collection in json format you can import using your postman to test the task

## in this Task There are

### 1- auth routes (/users/register, /users/login) which uses jwt for authoriation as a "bearer Token"

### 2- protected routes which requires authentication get(/users, /users/:id) post(/users) put(/users/:id) delete(/users/:id) Note: behaviour changes if the user wasn't an Admin

### 3- Not Found Route for any else route

### Have Fun ;)
