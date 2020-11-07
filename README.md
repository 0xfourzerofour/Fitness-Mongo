# Fit - A fitness web app

## Outline
Our proposed web application is a fitness tracking web application in which users
can create an account, build a program of exercises and track their progress for each
exercise.
### Purpose
The main purpose of the application is to allow users to track their fitness statistics,
logging data such as exercises and data about each exercise each time it is
completed. Users can then view a graph of their progress over time.
### Target User Group
The target user group is anyone wishing to track their fitness progress over a period
of time. These users will use the application by inputting data as they complete their
workout, or after their workout is completed.
### Data Sources
> No data sources will be used as the application data will rely on user input.

## Features Implemented
Users can:
* Create an account with an avatar and login to their account.
* View their workouts by clicking on a date on the calendar.
* Add to their workout on a chosen date.
* View their progress of a specific exercise over time.

## Guide to the project source code
    .
    ├───backend
    │   ├───models              # Contains the models for data stored using MongoDB
    │   ├───routes              # Contains the routes for the backend to handle API requests
    │   └───server.js           # Server file containing 
    └───frontend
        └───src
            ├───components      # Contains the React components used in the application
            ├───Context         # Contains the context state initialisation
            └───services        # Contains axios requests to the backend and token storing
            
## Future Work
A summary of what your next steps would be if you were to continue the project

## Roles and responsibilities
### Frontend
> Julian and Swarnim

Julian implemented view components including: the navigation bar, the chart view, the dashboard, and the home page. 
Julian also created calls to the backend to post and get data, and created this README.md.

Swarnim completed the documentation for the project.

### Backend
> Joshua and Brian

Joshua implemented API routes/Middleware, Database Schema, Applicaiton Deployment and helped with the frontend of the site. For the API routes and Midleware, Joshua created the /Auth, /Session, /Users routes and the corresponding 'Verify' Middleware function to protect the routes. The Database schema was decided as a group and Joshua imlpemented it into the application. Joshua Set up a CI-CD implementation with deployment using github actions that automatically creates a build of the applicaiton when the master branch is updated (Read more in Deployment.md). Joshua also assisted with creating the frontend of the site by imlementing the Search, Settings, About, Card, InfoCard, SessionForm, SessionAppend, Calender components and helpde with the Dashboard & Home components.   

Brian...
### Database
> All members

All members worked together to determine the optimal structure of data used in the application.
### Communication
Facebook and Zoom were used for communicaton throughout the project, with Facebook being
used for daily communcication including updates, and Zoom being used for weekly meetings.
