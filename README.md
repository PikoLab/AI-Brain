# AI-Brain 
The Fullstack AI project for Detecting Face!

### 1. Front-End: Create React App
```
$ npm install 
$ npx create-react-app aibrain
$ cd robofriends
$ npm start 
```

### 2. Back-End: Express.js
```node.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```


### 3. Clarifai AI Model API 
* source: https://www.clarifai.com/models/ai-face-detection

### 4. Heroku: Deploying with Git 
* Tracking the app in Git
```
$ cd aibrain
$ git init
$ git add .
$ git commit -m "My first commit"
```
* Creating a Heroku remote
```
$ heroku create
$ git remote -v
$ heroku git:remote -a heroku-app-name
$ git push heroku main
```
* source: https://devcenter.heroku.com/articles/git


### 5. Heroku: Deploying Database(PostgreSQL) 

* Install Knex
```
$ npm install knex 
$ npm install pg
```

* Heroku Postgres
```
$ heroku addons
$ heroku pg:info
$ heroku pg:psql
```

* Connecting in Node.js on Heroku
```
const knex = require('knex')({
  client: 'pg',
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
});
```

* Connecting in Node.js locally
```
const knex = require('knex')({
  client: 'pq',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'aibrain'
  }
});
```

* source: https://knexjs.org/
* source: https://devcenter.heroku.com/articles/heroku-postgresql
