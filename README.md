** This is testing task written in Python/Django and React.js and Redux **

# Installation
## Backend 
1. in root 
```
python -m venv venv 
. venv/bin/activate
```
1. Go to backend directory
1. run 
```
pip install -r requiremnts.txt
./manage.py migrate
./manage.py createsuperuser
required field is phone please use format 9 digits example 777665544
```
## Frontend
1. Go to frontend directory
1. Run
```
npm install
```

# Running
1. Go to backend directory and run development server
```
. venv/bin/activate
 ./manage.py runserver
```
1. Go to frontend directory
```
npm start
```

Now it will be available on http://localhost:3000

# How it's work
1. in localhost:300/ 
```
    Press to login
    enter phone number 9 digits
    Click Send
    in python terminal take 6 digits example - Your code is: 293031
    paste and click enter
```
1. Enter link 
``` click enter Link button ```
1. View links ``` click verify my links ```
1. Logout to change user 
``` click logout ```
