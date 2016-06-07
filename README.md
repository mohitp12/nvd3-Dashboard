This is the sample dashboard which displays the amount of data used by sensors per second.

Install Node v5.10.14

Install npm v3.8.3 and express v4.13.4

Install Mongo v3.2.6

Install Rabbitmq v3.2.4



To run this project follow the steps as mentioned below:

1) In the console execute "*mongod*" to turn on the mongodb server.

2) Execute "*use login*" and
"*db.login.insert({"username":of your choice,"password":of your choice})*". 
For e.g,db.login.insert({"username":"admin@gmail.com","password":"Admin@1234"})

Use the above inserted username and password to login to the dashboard.(As there is only login functionality, user needs to input username and password directly to database).

Use the above inserted username and password to log into the application.

3) Download the repository and unzip it.

4) Go to "*../Dashboard/bin*" and run "*node www*"(This will run your application on port 3000). 

5) After that execute "node server" from your console to run server side program of RabbitMQ.

6) After successful completion of all the above mentioned steps. Go to "*http://localhost:3000/*" and would be able to see login page.

***Note : Due to version conflicting issues, node_modules are already added to this repository. So, no need to perform npm install*