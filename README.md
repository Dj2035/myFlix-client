# myFlix client app

##About## This is a database movie app built using the MERN stack technology (MongoDB, Express, React and Node.js). Parcel is also used to transpile, minify and organize codebase. The App displays a list of movies fetched from a remote database and allows user interactions such as adding a movie to favorites and dislaying details about movies, their genre and director infos.

## Dependencies

This app uses:

"axios": "^0.27.2",
"parcel": "^2.0.0-rc.0",
"react": "^17.0.2",
"react-bootstrap": "^2.4.0",
"react-dom": "^17.0.2",
"react-redux": "^8.0.2",
"react-router-dom": "5.2.0",
"redux": "^4.2.0",
"redux-devtools-extension": "^2.13.9"

When parcel is run to start the app, it will also install the devDependency @parcel/transformer-sass, as SCSS is used in the app. Additionally, propTypes is used throughout, but does not need to be installed. IMPORTANT: Use the versions listed here or the app will not run.

## The API 
The API is currently stored using MongoDB Atlas, and was created before the app by myself. All data shown in the app is sourced from this API.

Using React to build the client-side for an application called myFlix-client, based on its existing server-side code (REST API and MongoDB). The application is a single-page application (SPA) and uses state routing to navigate between views and sharing URLs.

## App views

### Main view
- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

### Single movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

### Login view
- Allows users to log in with a username and password

### Registration view
- Allows new users to register (username, password, email, birthday)

### Genre view
- Returns data about a genre, with a name and description
- Displays example movies

### Director view
- Returns data about a director (name, bio, birth year, death year)
- Displays example movies

### Profile view
- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies
- Allows users to remove a movie from their list of favorites

![This is a screenshot of the myFlix/Client App](myFlix-Client.png)

#### Contact
[GitHub](https://github.com/Dj2035)
