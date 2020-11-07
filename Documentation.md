**Group D**

Brian David Mbalala Wekulo - 44438214

Joshua Pauline - 44931484

Julian Cesaro - 45242577

Swarnim Madan - 45504539


**Purpose**

The website produced by the team provides the user a platform to log their workout schedule. Logging in and adding workout details (amount of sets, reps, weights etc.) constitutes some of the main features of this website. An ideal target audience for the website constitutes people of all ages, looking to see progress in their workouts. This document further elaborates the process of building the website through React, a Javascript library for building user-interfaces. 

**Outline**

The website operates cohesively with the frontend and the backend servers. The team divided up into pairs of two to handle the front and back-end. 

**Visual**

**Integration** 
 
**Frontend integration** 

Frontend integration involves the forms and services which the user can view and access on the website. One of the main aims of the website is for the user to keep track of their workouts, thus, a calendar will be visible on the landing page. A feature with which the user can add exercises, reps, sets for each day is provided.

- **Loginform** under the components section works to show the user an input pop-up for their username and password. Users can also register if they are new to the website. Furthermore, using the component “handleUsernameChange” and “handlePasswordChange”, the user can also change their usernames and passwords respectively. The design for this pop-up loginform is made from Bootstrap. User services from the “/services/login” section are imported to handle login in the “handleLogin” component. Login.js in the services section contains an axios request which fetches the user’s credentials and base url and then returns the data. 

- The **home** section in the landing page refers to the dashboard. “Home.js” imports “Dashboard.js”. Dashboard file manages user sessions on the website and authorizes user tokens. 

- **Calendar** file is made under components to store the details of the workout. Features included are date, exercise, sets, reps and weights. A new session is authorized in “getNewSession” component which fetches an axios GETrequest for the date. Furthermore, the session gets reserved when authorized. The component “dateChange” helps the user change the date of the exercise input. This feature can be used in case the user wants to add exercises for an older workout session. 

- **RegisterForm.js** helps a new user register for the website and log in easily afterwards. Bootstrap has been used for various tags in this file. The component “RegisterForm” consists of all the features in this file. Username, password, confirmation, registration and message are all provided a state. “handleRegister” confirms that the password provided is now the user’s legitimate password, otherwise, an error is shown to the user. Furthermore, “catch (error) is used to catch any errors which occured in the process without having the website completely crash. 

- Files such as **Home.js** and **About.js** provide a page where the links can go to. Both the pages consists of components which provides links with heading and aren't entirely populated.

- **SessionAppend.js** uses Grommet for defining the sessions and adding user-interactivity towards which calender days have workouts and which ones don't. Grommet essentially is a React-based web UI framework for designing the system. SessionAppend.js helps in handling the addition of a new workout with its details on a particular day in the calender. It also checks whether the user adding the workout is authorized using a token. In case of a change in workout details, the component, "handleChange" gets called. This js file also contains a small form for the adding the workouts using the <TableBody> tag. It is laso to be noted that catch (error) is used in components so that the website can refrain from crashing completely if something out of the ordinary was to happen. 
 
 - The top navigation bar is set in the file **Topnav.js**. The logged in user's name corresponding to a dashboard can be seen. If the user is not logged in, a log in option is shown to the user instead. An about and home section are also available.
 
 
**Backend integration** 

Back-end handles the “behind-the-scenes” server-side of the website. 

- The models produced in the backend have schema imported from mongoose. The exercise schema has the ability to store string variables. This was done keeping in mind that the users would have to type the workouts they want to store. A maximum length of the string, being 250 characters is defined. It is to be noted that since different workouts can be added separately for the days, not more than 250 characters would be needed by the user. The **usermodel.js** adds an image option for the user. This acts as an avatar for the user. Images in the backend are stored under the images folder.  

- Routes are developed in the "routes" folder from the backend. The authorisation route is called on the signin page so that we can check if the username and password match a user in the database. We are using **bcrypt** compare fucntion to check if the hashed password is correct compared to the parsed password. **Auth.js** initiates the JWT token to be stored on the frntend and sign it with the user id so that we can extract that infromation using our verify middleware. Functins verifying username, id and authorisation details are defined in this file.

- The file **verify.js** is used for the creation of a verifying middleware function. This function can be passed in and run before the API request is processed. The main function checks to see if the user's auth-token can be verified against the TOKEN_SECRET that is stored in the .env file. Once this verification is done, userid can be extracted. 

- The verifying middleware mentioned before needs to be coded in the routes folder. The file **posts.js** is used to import the verifying middleware that allows us to check and see whether the users pass a valid auth-token to the request. As an outcome, all requests which fail verification or do not have a valid token will be denied. The function defined in the file also activates when a user tries to add in a new workout exercise and it is to be added to the database as well. The function extracts all content from the request body and also checks to see how long the text is as it shouldn't exceed 250 character per the previous conditions defined. 

- A main aim of this website project is to make it user-interactive and personal. The incentive was met by allowing users to add images to the website as avatars. The file **users.js** is used to specify the location to store the images on the server and to automatically name the files based on their original name and current timestamp. This prevents any duplicates and saves the database from being too crowded. One of the functions defined in this file include an API request which takes the request username and returns all information about the requested user, excluding, of course, the hashed password information. This is shown in a '/userdetails' API. In a similar fashion, requests regarding user id based on their username is also defined ('/id'). User.findById makes a request to the verifying middleware function to extract user information based on their id. This function gets called in the App.js file on load as well. 
The function escapeRegex is a regular expression function created to helpl with the search route so that a fuzzy search could be implemented. 

- Further routes include 
 



