# Quilled
This is a clone of [Evernote](https://evernote.com/). \
Users can sign up to create notes as well as notebooks to save any kind of information they may need.

# Live Site
[Quilled](https://quilled.herokuapp.com/signup)

# Index
| [MVP Feature List](https://github.com/jonevanmoore/quilled/wiki/Feature-List) | [Database Schema](https://github.com/jonevanmoore/quilled/wiki/DB-Schema) | [API Routes](https://github.com/jonevanmoore/quilled/wiki/API-Routes) | [Frontend Routes](https://github.com/jonevanmoore/quilled/wiki/Frontend-Routes) | 

# Technologies Used
<img src="https://camo.githubusercontent.com/528e232c728b497080cbf31d2a7e797caa81e402ff81643f79b2c2c395a29f17/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d706c61696e2e737667" width="50" /> <img src="https://camo.githubusercontent.com/e84431cfbd9f7c44b1c20da1dde8ad407cbc31174844a428074d1e3b43faab8b/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2d776f72646d61726b2e737667" width="50" /> <img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" width="50" /><img src="https://camo.githubusercontent.com/66a47251fab3236cff187214ff8215c1df71b46739b8b1803ac4cebdfe5c7918/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f657870726573732f657870726573732d6f726967696e616c2d776f72646d61726b2e737667" width="50"/><img src="https://camo.githubusercontent.com/bfde91f425cddc4b06f6a15c2ae50d90a64008c3b05f9733123127e039ffcdf6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2d776f72646d61726b2e737667" width="50" /><img src="https://camo.githubusercontent.com/626fb60c4c17c2cf2ad0e599efaa8ed691ede878ce1e94b85c0c401701716f8e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6e6f64656a732f6e6f64656a732d6f726967696e616c2d776f72646d61726b2e737667" width="50" /><img src="https://camo.githubusercontent.com/89a4f052af35af3ae91139b0da6496483e00d4fb645589fc4d26cf95b42f8454/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d706c61696e2d776f72646d61726b2e737667" width="50"/><img src="https://camo.githubusercontent.com/b3ce9472d369cacc72c37b7be98298b051836c138eada89587178fbd41939043/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d706c61696e2d776f72646d61726b2e737667" width="50"/><img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" width="50"/><img src="https://camo.githubusercontent.com/ee5225ba7c4338f1a1c10121ec32c396e1a4a2f5b0b58b6afd6d5c56ff5d6196/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2d776f72646d61726b2e737667" width="50"/>

# Getting Started

1. Clone this repo
  ```
  git clone git@github.com:jonevanmoore/quilled.git
  ```
2. Install dependencies from the root directory
  ```
  npm install
  ```
3. Create a user in POSTGRESQL with a PASSWORD and CREATEDB permissions
  ```
  CREATE USER <name> WITH PASSWORD <'password'> CREATEDB
  ```
4. Create a .env file in backend directory modeled off of the .env.example from the backend directory and fill out the respective information.

5. Add a proxy to the package.json file in the frontend directory to match the PORT configuration in the .env file
  ```
  "proxy": "http://localhost:5000"
  ```
6. Create Database, Migrate, and Seed models
  ```
  npx dotenv sequelize db:create
  ```
  ```
  npx dotenv sequelize db:migrate
  ```
  ```
  npx dotenv sequelize db:seed:all
  ```
7. Start the backend server
  ```
  npm start
  ```
8. Start the frontend server
  ```
  npm start
  ```
 
