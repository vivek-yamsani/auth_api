# Getting Started
### First clone the repo then spin up mysql and phpmyadmin
```bash 
cd docker
docker-compose up
```
### then intialize the database with init.sql file in mysql console
```bash
docker exec -it docker_db_1 bash
```
```bash
mysql -u root -p7149
```
```bash
source /src/init.sql
```
### now install dependencies with npm 
```bash
npm install
```
### now we are good to go 
```bash
npm start 
```

#### post /login  ---> for login
#### post /signup ---> for signup
#### post /update ---> for update in password

#### naming convention for html elements is
#### username,password,new_password
