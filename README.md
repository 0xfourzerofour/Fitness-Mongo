# Fit - A fitness web app

An outline of the application you were aiming to build, target users, data sources etc (similar to the proposal)

## Outline
Our proposed web application is a fitness tracking web application in which users
can create an account, build a program of exercises and track their progress on each
exercise.
### Purpose
The main purpose of the application is to allow users to track their fitness statistics,
logging data such as exercises and data about each exercise each time it is
completed. Users can then view a graph of their progress and potentially share this
progress with other users.
### Target User Group
The target user group is anyone wishing to track their fitness progress over a period
of time. These users will use the application by inputting data as they complete their
workout, or after their workout is completed. Users should be able to login and
access data input forms and progress from a home page.
### Data Sources
No data sources will be used as the application data will rely on user input.

## Features Implemented
A description of what you have been able to implement in this MVP, use your milestones to highlight what you've achieved
Target features:
• The user shall be able to create an account. A username and password
provided by the user will be able to identify the user.
• The user shall be able to login to their account. The username and
password provided by the user will be used to validate them.
• The user shall be able to add daily exercises. They can input multiple
exercises per day.
• The user shall be able to add further data to their exercises. This will
include details of the workout. For eg:
o The distance they ran.
o The calories they burnt per exercise.
o The sets and reps on each exercise.
o The weights lifted on each set of an exercise.
• The user shall be able to view a graph of their progress, generated per
exercise. Graphs will be based on the previous week’s exercise data and will
help track any progress and/or regress made by the user.
COMP3120 Project Proposal Group D
Features that won’t be included:
• Details regarding the location of the workout won’t be included in the MVP.
The reason behind this is that the team is worried about violating the privacy
of a user - and location data seems quite complex to implement.
• User interaction won’t be included beyond potentially being able to share
progress graphs with other users as this is quite a complex feature
(messaging).

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
A summary of the main roles and contributions of each team member and how you managed interaction and communication through the project
### Frontend
Julian and Swarnim will undertake the task of developing the frontend for the fitness
application. This includes any aesthetic auditions to the site that will render data
coming from the backend. They will work with the backend team in order to design a
user interface that works well given the designated data models.
### Backend
Joshua and Brian will be responsible for developing the backend of the application to
be able to handle requests coming from the frontend and return appropriate
responses to these requests. The backend will include the API routing, Static file
system, Authentication middleware, and Deployment.
### Database
All members of the group will work together to determine the optimal data model that
will work for the fitness application functions. This data model will be conceptualised
and then implemented into the DB schema that is defined in the backend of the
application. The group will also decide whether a DAAS (Database as a Service e.g
MongoDB Atlas) or a database located on the server would be an optimal option for
the application.
### Testing
Similarly to the Database roles and responsibilities, the whole team will work on the
testing implementation. Tests will need to be created for both the frontend and the
backend to make sure that the application is running smoothly without any unwanted
side effects
### Communication
Facebook and Zoom were used for communicaton throughout the project, with Facebook being
used for daily communcication including updates, and Zoom being used for weekly meetings.
