<h1 align="center">Scraping product API</h1>

This api connects to online stores and collects product information

**Technology stack** The API is written in TypeScript using TypeORM, dotenv,
nodemon with such frameworks as: 
Express
Sheerio
Puppeteer. Using MySql database. And Docker is also involved

**Getting Started** 
After you clone the project, you need to install 'node_modules' with help command: 

```
npm install
```

**Selection of the project deployment location**
You will need to choose where you will deploy the API.

If this will be done on your local machine, you should create an `.env` file from the `.env.example` and set the credits of your database:


```
PORT=5000

DB_HOST=lacalhost
DB_PORT=3306
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydatabase
```

If you decide to raise the api through docker, you can use the already existing document `.env.docker` and execute the command:

```
docker-compose up --build
```

Don`t forget install Docker😅
