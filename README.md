<h1 align="center">Scraping product API</h1>

This api connects to online stores and collects product information

**Technology stack** The API is written in TypeScript using TypeORM, dotenv,
nodemon with such frameworks as: 
Express
React
Axios
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

DB_HOST=localhost
DB_PORT=3306
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydatabase
```



If you decide to raise the api through docker, you can use the already existing document `.env.docker` and execute the command:

```
docker-compose up --build
```

**Populating the Database with Products**

Before rendering the list of products, you need to populate the database with product information. This can be done by making POST requests to specific endpoints that scrape product data from online stores.

You can use Postman or any other API testing tool to make the following POST requests:

`To scrape product information from Telemart:`

```
Example endpoint: http://localhost:3050/api/scrape/telemart
```
Description: Fetches and stores information about videocards from Telemart.

`To scrape product information from Rozetka:`
```
Example endpoint: http://localhost:3050/api/scrape/rozetka
```
Description: Fetches and stores information about videocards from Rozetka.
After successfully making these requests, the database will be populated with product data, and you will be able to render the list of products.

**Viewing the Frontend Application**
After a successful Docker build, you will see a message in the console similar to the following:

```
You can now view frontend in the browser.
frontend-1  |
frontend-1  |   Local:            http://localhost:3000
frontend-1  |   On Your Network:  http://172.18.0.4:3000
```
This indicates that the frontend application is up and running and can be accessed via the provided URLs.

Local: This URL can be used to view the application on the same machine where the Docker container is running.
On Your Network: This URL allows other devices on the same network to access the application.
Simply open a browser and navigate to one of the URLs to start using the frontend application.

Don`t forget install Docker😅
