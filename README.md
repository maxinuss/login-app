# login-app

### Task

```
Build small web app (frontend & backend) with the following features

User signup
User login

An additional api that fetches data for a logged in user (e.g., GET user-info to display on home page)
The app should be built using ReactJs, NodeJs with Express, and Sequelize. Bonus points for the following, Material UI, Docker, documentation and a working app we can run locally.

Please push your code to a public Github repository and provide a link for the team to review.
```
---
#### Stack
* Node
* Express
* React
* MaterialUI
* PostgreSQL

---
#### Run it with docker
Requirements:
* docker
* docker-compose

Instructions:
* Clone this repo
* Go to the repo root
* Inside ```backend``` folder Copy the .env.example file to .env (default params will work)
* Inside ```frontend``` folder Copy the .env.example file to .env (default params will work)
* Run ``` make up``` if you use Linux (if not you can run ``` docker-compose up -d```).
* Run ``` make back``` (or ```docker exec -it node-login-back-container bash```).
* Inside the container run ```npm run migrate``` to create the database.
* If you didn't change .env default values the frontend will be accessible in: ```http://localhost:4403/login```

---
#### Internal / External Ports
- Node 3000 / 3503
- Postgre 5432 / 5473
- React 4403 / 4403

---
#### Docker useful commands
- Tail containers logs: ``` make logs ``` or ```docker-compose logs -f```
- Tail backend logs: ``` make logs-back ``` or ```docker container logs -f node-login-back-container```
- Tail front logs: ``` make logs-front ``` or ```docker container logs -f node-login-front-container```
