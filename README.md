# [Triplis - quiz social application](https://triplis.netlify.app/)

![ ](https://img.shields.io/badge/NodeJs-v16.13.0-brightgreen)
![ ](https://img.shields.io/badge/ExpressJs-v4.17.2-yellow)
![ ](https://img.shields.io/badge/React-v17.0.2-blue)


## Demo: [click-me](https://triplis.netlify.app/)


Triplis is a social app for building and playing interesting quizzes  
you can use the code under the terms described in the license  

if you want to create your own Triplis then follow the instructions below

---

## 1. Setting up the server:

first you need to create .env file in ./server and then 

```env
PORT= `custom port recommend 5000`
CLIENT=`your client link fro example https://example.com`
DB=`your MongoDb link`
SMTP_HOST=`smtp.gmail.com recommended`
SMTP_PORT=`587 recommended`
SMTP_USER=`email esely for example example@gmail.com`
SMTP_PASSWORD=`password for the smtp user accaunt`
DEFAULT_AVATAR=`default avatar it will be used when user creating accaunt`
DEFAULT_AVATAR_ID=`Cloudinary default avatar public id`
JWT_ACCESS_SECRET=`custom secret`
JWT_REFRESH_SECRET=`custom secret recommented to not to be same with access secret`
STORAGE_NAME=`Cloudinary storage name`
STORAGE_API_KEY=`Cloudinary storage api key`
STORAGE_API_SECRET=`Cloudinary storage secret key`
MAIN_UPLOAD_PRESET=`Cloudinary main upload preset where quiz images will be store`
AVATAR_UPLOAD_PRESET=`Cloudinary main upload preset where avatars will be store`
```
---

### 2. Setting up the client:

first you need to get config.json file in ./client/src/http and then

```json
{
    "baseURL": "Your server's url"/api
}
```
---

### 3. Enjoy the project

<br />

## Packages list:

+ Client :
  +  react: ^17.0.2,
  +  react-dom: ^17.0.2,
  +  react-redux: ^7.2.6,
  +  react-router-dom: ^6.2.1,
  +  react-scripts: 5.0.0,
  +  redux: ^4.1.2,
  +  redux-devtools-extension: ^2.13.9,
  +  redux-thunk: ^2.4.1,
  +  sass: ^1.49.8,
  +  web-vitals: ^2.1.4 
  +  axios: ^0.26.0,
  +  moment: ^2.29.1,
  +  @mui/icons-material: ^5.4.2,
+ Server: 
  +  bcryptjs: ^2.4.3,
  +  cloudinary: ^1.28.1,
  +  cookie-parser: ^1.4.6,
  +  cors: ^2.8.5,
  +  dotenv: ^16.0.0,
  +  express: ^4.17.3,
  +  jsonwebtoken: ^8.5.1,
  +  mongoose: ^6.2.2,
  +  nodemailer: ^6.7.2,
  +  uuid: ^8.3.2

---

## Copyright © 2022 Triplis-Quiz-App Created by [Rufat](https://github.com/Rufat00)
