# Carfew - Fewer cars, more friends 🤝
<div class ="row">
    <div class ="col-md-8">
* [About Carfew](https://github.com/carfew/carfew/tree/dev#what-is-carfew-)
* [The Team](https://github.com/carfew/carfew/tree/dev#who-are-the-carfew-dev-team--)
* [File Structure](https://github.com/carfew/carfew/tree/dev#file-structure-)
* [Endpoints](https://github.com/carfew/carfew/tree/dev#endpoints)
  * [Rides Endpoints](https://github.com/carfew/carfew/tree/dev#rides)
  * [Auth Endpoints](https://github.com/carfew/carfew/tree/dev#authentication)
* [APIs](https://github.com/carfew/carfew/tree/dev#api-integration---what-apis-are-we-using)
* [Running](https://github.com/carfew/carfew/tree/dev#running)
* [Testing](https://github.com/carfew/carfew/tree/dev#testing)
* [Contact Info](https://github.com/carfew/carfew/tree/dev#additional-contact-info)
    </div>
    <div class="col-md-4">
<img src="public/img/favicon_carfew.png"
     alt="Carfew Favicon"
     align="middle"
     width="200" />
     </div>
</div>
## What is Carfew? 🚘
Carfew is a new, innovative ride-sharing solution for those who want to meet new people 👋. With Carfew, you drive to make connections and meet people who like the same things that you do.

Connect with others over a mutual in-app community and request rides with people who are going the same way that you are. Its hitchhiking for the 21st century 👍.

In future iterations of this app, we would like to make communities dynamic with Reddit-style comment systems. We'd also like to allow riders to share ride costs with their drivers. We're looking into a verification system for all members of the app to make sure you're only meeting up with awesome, legit people.

This is an open-source project! Watch this repo for future updates 😉

## Why did we build Carfew? 🚗
We all believe that climate change is an inevitable reality that we have a responsibility to do something about. Fewer cars on the road is one way to help curb those effects.

Additionally, we are interested in understanding city infrastructure and being good citizens of the city we live in, San Francisco ❤️ . Building an app that can help to limit the number of vehicles moving around the city will help make the air more breathable and make the streets safer for everyone.

## Who are the Carfew dev team? 👩‍💻 👨‍💻
Our core developers are:
- Erik Batista - Front End Dev, UI/UX Design - HTML, CSS, Handlebars, Sketch
- Colleen Ni - Back End Dev - Node, Express, MongoDB
- Wenzel Lowe - Full Stack Dev, API Integration - Node, Express, MongoDB, React, Google Maps API
- Faith Chikwekwe - Back End Dev, Product Manager - Node, Express, MongoDB, HTML, CSS, Handlebars


## File Structure 🗂
```
root/
|
|-- controllers/                # routing and logic
        |-- ride.controller.js
        |-- user.controller.js
        |-- auth.controller.js
|
|-- models/                     # database models
      |-- ride.model.js
      |-- user.model.js
|
|-- views/                      # handlebars templates
      |--layouts/
      |
      |-- partials/
|
|-- tests/                      # unit testing
      |-- rides.test.js
      |-- users.test.js
      |-- auth.test.js
|
|-- config/                     # dev and configuration
|     |-- config.js
      |-- express.js
|
|-- public/                     # public folder for static content
      |-- css/
      |-- js/
      |-- img/
|
|-- env files                   # environment variables
|-- index.js                    # dev server
|-- notes.md                    # unorganized notes; pre-Kanban board
|-- README.md
```

## Endpoints
### Rides
#### '/rides' - create ONE ride
The user can create a ride by specifying the origin, the destination and the pickup window. The ride itself creates a mixed type object that can interact with the Google Maps API to display on a map.

#### '/rides/:id' - read/show ONE ride
The user can read a single ride by clicking on it from the index view or after creating a ride. While viewing the ride, they have the option to accept the ride, if another use has posted it. They also have the option to delete the ride if it is their own.

#### '/rides/:id' - delete ONE ride
The user can delete their own posted rides. If the user goes to the show ONE route, and the ride is their own, then an option to delete should be displayed.

#### '/rides' - show ALL rides
The user can see all rides posted by users within the app. This is where the user can select rides to view in detail.

### Authentication
#### '/sign-up' - show sign-up template
User can see the sign-up template and enter their sign-up information.

#### '/sign-up' - create ONE user
User sign-up information is validated and processed through a POST route. Their email address, username and phone number must all be unique in order for the login to be successful. They must also choose a password.

If successful, a JWT token will be created to keep them logged in for the duration of the session. This route will redirect to the rides index.

#### '/login' - show login template
User can see the login template and enter their login credentials.

#### '/login' - show ONE user
User login credentials are validated and processed through a POST route. Their username OR email address OR phone number must exactly match the information that we have on file. Their password must also be valid.

If successful, a JWT token will be created to keep them logged in for the duration of the session. This route will redirect to the rides index.

#### '/logout' - log user out
The route will destroy the user's JWT token removing authorization to create and delete rides and interact with their communities.

The user will be routed back to the root route.

## API Integration - What APIs are we using?
- Google Maps API - used for displaying rides and for creating ride objects.

## Running

## Testing
We used Mocha and Chai for testing. Tests are stored in /tests directory.

To run tests for this project, clone the project and then type the command 'npm test' or 'mocha' into your console from the project root folder.

## Additional Contact Info
