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
* Search for other users to see how many days they have logged. 
* update their user information (password, username, image)

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

Julian implemented view components including: the navigation bar, the chart view, the dashboard, the home page, The login and register forms (and the handling of data in these components), and helped with the implementation of the calendar. 
Julian also created calls to the backend to post and get data, helped with implementing routes in the backend (specifically /session routes) and created this README.md containing information about the project.

Swarnim completed the documentation for the project (seen below).

### Backend
> Joshua and Brian

Joshua implemented API routes/Middleware, Database Schema, Applicaiton Deployment and helped with the frontend of the site. For the API routes and Midleware, Joshua created the /Auth, /Session, /Users routes and the corresponding 'Verify' Middleware function to protect the routes. The Database schema was decided as a group and Joshua imlpemented it into the application. Joshua Set up a CI-CD implementation with deployment using github actions that automatically creates a build of the applicaiton when the master branch is updated (Read more in Deployment.md). Joshua also assisted with creating the frontend of the site by imlementing the App, Search, Settings, Username, Password, Image, About, Card, InfoCard, SessionForm, SessionAppend, Calender components and helped with the Dashboard & Home components.   

Brian...
### Database
> All members

All members worked together to determine the optimal structure of data used in the application.
### Communication
Facebook and Zoom were used for communicaton throughout the project, with Facebook being
used for daily communcication including updates, and Zoom being used for weekly meetings.


# Documentation

**Integration** 
 
**Frontend integration** 

Visually the website shows a calender on the landing page and prompts the user to log in before conitnuing their exploration of the website. If the user is new, registering for the website is recommended. A dashboard with a navigation bar is shown with the user name and avatar once the user is logged in. The user can then choose a date for themselves to add the corresponding workout. Dates with an already added workout session have a different appearance so the users can keep easy track of the days they worked out.


Frontend integration involves the forms and services which the user can view and access on the website. One of the main aims of the website is for the user to keep track of their workouts, thus, a calendar will be visible on the landing page. A feature with which the user can add exercises, reps, sets for each day is provided.

- **Loginform** under the components section works to show the user an input pop-up for their username and password. Users can also register if they are new to the website. Furthermore, using the component “handleUsernameChange” and “handlePasswordChange”, the user can also change their usernames and passwords respectively. The design for this pop-up loginform is made from Bootstrap. User services from the “/services/login” section are imported to handle login in the “handleLogin” component. Login.js in the services section contains an axios request which fetches the user’s credentials and base url and then returns the data.

- The **home** section is the landing page of the website. “Home.js” imports “Dashboard.js”. 

- **Calendar** file is made under components to store the details of the workout. Features included are date, exercise, sets, reps and weights. A new session is authorized in “getNewSession” component which fetches an axios GETrequest for the date. Furthermore, the session gets reserved when authorized. The component “dateChange” helps the user change the date of the exercise input. This feature can be used in case the user wants to add exercises for an older workout session. New user sessions are handled in **App.js**.

- **RegisterForm.js** helps a new user register for the website and log in easily afterwards. Bootstrap has been used for various tags in this file. The component “RegisterForm” consists of all the features in this file. Username, password, confirmation, registration and message are all provided a state. “handleRegister” confirms that the password provided is now the user’s legitimate password, otherwise, an error is shown to the user. Furthermore, “catch (error) is used to catch any errors which occured in the process without having the website completely crash.

- Files such as **Home.js** and **About.js** provide a page where the links can go to. Both the pages consists of components which provides links with heading and aren't entirely populated.

- **SessionAppend.js** uses Grommet for defining the sessions and adding user-interactivity towards which calender days have workouts and which ones don't. Grommet essentially is a React-based web UI framework for designing the system. SessionAppend.js helps in handling the addition of a new workout with its details on a particular day that has existing workout in the calender. This is similar to the **session form**. It also checks whether the user adding the workout is authorized using a token. In case of a change in workout details, the component, "handleChange" gets called. This js file also contains a small form for the adding the workouts using the <TableBody> tag. It is laso to be noted that catch (error) is used in components so that the website can refrain from crashing completely if something out of the ordinary was to happen.

- The top navigation bar is set in the file **Topnav.js**. The logged in user's name corresponding to a dashboard can be seen. If the user is not logged in, a log in option is shown to the user instead. An about and home section are also available.

**Backend integration**

Back-end handles the “behind-the-scenes” server-side of the website.

- The models produced in the backend have schema imported from mongoose. The exercise schema has the ability to store string variables. This was done keeping in mind that the users would have to type the workouts they want to store. A maximum length of the string, being 250 characters is defined. It is to be noted that since different workouts can be added separately for the days, not more than 250 characters would be needed by the user. The **usermodel.js** adds an image option for the user. This acts as an avatar for the user. Images in the backend are stored under the images folder.

- Routes are developed in the "routes" folder from the backend. The authorisation route is called on the signin page so that we can check if the username and password match a user in the database. We are using **bcrypt** compare fucntion to check if the hashed password is correct compared to the parsed password. **Auth.js** initiates the JWT token to be stored on the frntend and sign it with the user id so that we can extract that infromation using our verify middleware. Functins verifying username, id and authorisation details are defined in this file.

- The file **verify.js** is used for the creation of a verifying middleware function. This function can be passed in and run before the API request is processed. The main function checks to see if the user's auth-token can be verified against the TOKEN_SECRET that is stored in the .env file. Once this verification is done, userid can be extracted.

- The verifying middleware mentioned before needs to be coded in the routes folder. The file **posts.js** is used to import the verifying middleware that allows us to check and see whether the users pass a valid auth-token to the request. As an outcome, all requests which fail verification or do not have a valid token will be denied. The function defined in the file also activates when a user tries to add in a new workout exercise and it is to be added to the database as well. The function extracts all content from the request body and also checks to see how long the text is as it shouldn't exceed 250 character per the previous conditions defined.

- A main aim of this website project is to make it user-interactive and personal. The incentive was met by allowing users to add images to the website as avatars. The file **users.js** is used to specify the location to store the images on the server and to automatically name the files based on their original name and current timestamp. This prevents any duplicates and saves the database from being too crowded. One of the functions defined in this file include an API request which takes the request username and returns all information about the requested user, excluding, of course, the hashed password information. This is shown in a '/userdetails' API. In a similar fashion, requests regarding user id based on their username is also defined ('/id'). User.findById makes a request to the verifying middleware function to extract user information based on their id. This function gets called in the App.js file on load as well. The function escapeRegex is a regular expression function created to help with the search route so that a fuzzy search could be implemented and we can pass the regular expression into the find function based on username matchs. A user creation route is also defined in the users.js file which comes into play When a user registers with the application. The function first extracts the username, password, bio and image from the form data and then convert the username to lowercase so that all users are lowercase. Afterwards, the bcrypt library is used to store passwords in the database in a hashed manner instead of plain text. Multer is used to get an image path from the uploaded image as a middleware to create the path and store the file before the request is processed. The function User.updateOne builds a route to take the current user from the auth-token and adds them in the requested username to the corresponding array.

- Further routes include **session.js**. This file builds a route to session definition for the user. This file includes the creation of a new session and saves the session. The function also has catch(error) so as to not crash the whole website in case of an error. Functions which requests to get workouts for the user from auth-token id, update workouts and adds a session by date are also implemented. 
 
>>>>>>> ac47c1c0c0e4501361799b69a46a0977a497ea52

