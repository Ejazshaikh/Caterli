# Caterli

## Instructions

### Step 1:
Clone the repo.

### Step 2:
Install MongoDB and run mongoDB server in Terminal using ```mongoD``` command.

### Step 3:
Go to caterli-db dir in your terminal

### Step 4:
Import the database from the json dump using following command.\
**_Note:_**  Please delete any mongoDB database with name **caterli-db** if exists..
```properties
mongoimport --db=caterli-db --collection=restaurants --file=restaurants.json
```

### Step 5:
Go to caterli-server dir in Terminal and add .env and add the following line in it.\
```properties
caterli_jwtPrivateKey=my_secret_key
caterli_db=mongodb://localhost/caterli-db
```

### Step 6: 
In the caterli-server dir in Terminal and run the following command.\
```properties
npm install && npm start
```
### Step 7:
Go to caterli-app dir in separate Terminal and run the following command.\
```properties
npm install && npm start
```

### End.
