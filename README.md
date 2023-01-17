## Yago Challenge

This repository contains the code for the Yago challenge. 
It is a simple NodeJs app... nothing fancy, nothing special.

The following tools and libraries are used:
- node -> v18.13.0
- npm -> 8.19.3
- axios
- better-sqlite3
- dotenv
- express
- pug

## Set up project
- install system hard requirements:
```
node -> v18.13.0
npm -> 8.19.3
```
- clone the repository :
```
git clone https://github.com/r4t4x3s/yago
```
- Create `.env` and provide `YAGO_KEY`(api key to access the quote api))
````
cd yago/
echo YAGO_KEY=#YOUR_YAGO_KEY >> .env
````
- Install npm packages:
```
 npm install
```
- Run the app :
```
npm start
```
- Access the home page on http://localhost:3001

# Immediate Improvements:

- implement error handling
- implement some kind of validation at least on the models
- models are tightly coupled with the database driver so either create an indirection or juste use an ORM
- use a testing framework and implement tests
- front-end needs "ricing"
- **OR** just bootstrap a Rails app and get it all almost for free
