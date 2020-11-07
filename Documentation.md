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

- **Loginform** under the components section works to show the user an input pop-up for their username and password. Users can also register if they are new to the website. Furthermore, using the component “handleUsernameChange” and “handlePasswordChange”, the user can also change their usernames and passwords respectively. The design for this pop-up loginform is made from Bootstrap. User services from the “/services/login” section are imported to handle login in the “handleLogin” component.

Login.js in the services section contains an axios request which fetches the user’s credentials and base url and then returns the data. 

- The **home** section in the landing page refers to the dashboard. “Home.js” imports “Dashboard.js”. Dashboard file manages user sessions on the website and authorizes user tokens. 

- **Calendar** file is made under components to store the details of the workout. Features included are date, exercise, sets, reps and weights. A new session is authorized in “getNewSession” component which fetches an axios GETrequest for the date. Furthermore, the session gets reserved when authorized. The component “dateChange” helps the user change the date of the exercise input. This feature can be used in case the user wants to add exercises for an older workout session. 

- **RegisterForm.js** helps a new user register for the website and log in easily afterwards. Bootstrap has been used for various tags in this file. The component “RegisterForm” consists of all the features in this file. Username, password, confirmation, registration and message are all provided a state. “handleRegister” confirms that the password provided is now the user’s legitimate password, otherwise, an error is shown to the user. Furthermore, “catch (error) is used to catch any errors which occured in the process without having the website completely crash. 

- Files such as **Home.js** and **About.js** provide a page where the links can go to. Both the pages consists of components which provides links with heading and aren't entirely populated.

- **SessionAppend.js** uses Grommet for defining the sessions and adding user-interactivity towards which calender days have workouts and which ones don't. Grommet essentially is a React-based web UI framework for designing the system. SessionAppend.js helps in handling the addition of a new workout with its details on a particular day in the calender. It also checks whether the user adding the workout is authorized using a token. In case of a change in workout details, the component, "handleChange" gets called. This js file also contains a small form for the adding the workouts using the <TableBody> tag. It is laso to be noted that catch (error) is used in components so that the website can refrain from crashing completely if something out of the ordinary was to happen. 
 
 - The top navigation bar is set in the file **Topnav.js**. The logged in user's name corresponding to a dashboard can be seen. If the user is not logged in, a log in option is shown to the user instead. An about and home section are also available.
 
 
**Backend integration** 

Back-end handles the “behind-the-scenes” server-side of the website. 

- The models produced in the backend have schema imported from mongoose. The exercise schema has the ability to store string variables. This was done keeping in mind that the users would have to type the workouts they want to store. A maximum length of the string, being 250 characters is defined. It is to be noted that since different workouts can be added separately for the days, not more than 250 characters would be needed by the user. The **usermodel.js** adds an image option for the user. This acts as an avatar for the user. Images in the backend are stored under the images folder.  

- Routes are developed in the 
 



