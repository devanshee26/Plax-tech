<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/devanshee26/Plax-tech.git">
    <img src="https://storage.googleapis.com/placement_assets/PLACEMENT_IMAGES/upp_icon_final.png" alt="Plax-tech" height="80">
  </a>

  <h3 align="center"><samp>The University Placement Portal</samp></h3>

  <p align="center">
    <br />
    <a href="https://plax.tech/#/index">View Demo </a>
    ·
    <a href="https://github.com/devanshee26/Plax-tech.git/issues"> Report Bug </a>
    ·
    <a href="https://github.com/devanshee26/Plax-tech.git/issues"> Request Feature</a>
  </p>
</p>

<hr/>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <h4>Table of Contents</h4>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <li><a href="#references">References</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot (476)](https://user-images.githubusercontent.com/55467927/110931127-e7d3bb00-834f-11eb-950e-3bec2605d8d4.png)(https://plax.tech/#/index)

Plax tech: The University Placement Portal is a one stop shop for preparing for the placement. Be it on-campus placement or off-campus opportunities, you can get information for both. Also you get exposed to various kinds of aptitude test subjects along with competitive coding question. The expert's ultimate advice for the placement preparation is cheery on the cake! The weekly blog articles are rich with interview-ethics which are much needed along with the knowledge.

There are 3 system users :
* <b>The Admin</b> : The system admin who manages the over-all site and take care of the content posted on the site. The admin is the head of university, who owns the system.
* <b>Experts</b> : The system experts are the one who handles the content of the system like posting blog articles, adding competitive coding questions, creating quiz questions and managing placement details. They can create their account and login in the system to add the quality content.
* <b>Anonymous users</b> : The system is open to the Internet! Any user can visit the site, read articles, practice quiz and coding. He/She can also view the placement scopes.

The system primely provides the following features :
* Coding Platform
* Quiz Practice
* Blog Engine for Placement preparation
* Placement scopes on-campus and off-campus along with placement predictor.

#### Built With

The project is tech-rich made with multiple frameworks and libraries. The tech stack employeed for the developement is as listed below : 

* <img  height="20" src="https://www.vectorlogo.zone/logos/angular/angular-icon.svg"> [Angular](https://angular.io/) 
* <img height="20" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"> [Nodejs](https://nodejs.org/en/)
* <img height="20" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg"> [Express](https://expressjs.com/)
* <img  height="20" src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg"> [Mongo](https://www.mongodb.com/)
* <img  height="20" src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg"> [Flutter](https://flutter.dev/)
* <img  height="20" src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg"> [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* <img height="20" src="https://img.icons8.com/ios/50/000000/selenium-test-automation.png"/>[Selenium](https://www.selenium.dev/)
* <img  height="20" src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"> [GCP](https://cloud.google.com/)



<!-- GETTING STARTED -->
### Getting Started

Follow the steps given below to set up the project locally!
The Node-Express-Mongo backend and Angular frontend are hosted separatly so you can run any of the 3 projects without other.  

#### Prerequisites

You must have following installed in the system.

* npm

  ```sh
  npm install npm@latest -g
  ```
* angular

    ```sh
  npm install -g @angular/cli
  ```

* [Flutter](https://flutter.dev/docs/get-started/install)  :  follow the link to set up the flutter environment.
   

#### Installation

 Clone the following repository :
   ```sh
   git clone https://github.com/devanshee26/Plax-tech.git
   ```
Change the current directory to Plax-tech
  ```sh
   cd Plax-tech
   ```  

##### A. Setting up Node-Express-Mongo Backend. 

In order run the backend, you should have : 
* Google Cloud Platform Billing account and GCP Storage Bucket.
* MongoDB Atlas Cluster.
1.  [Follow the link to set up the environment.](https://storage.googleapis.com/sdp-university-placement-portal/documentation.pdf)

2.  Go to the directory : UPP-Backend
    ```sh
    cd NODE_EXPRESS_MONGO_BACKEND/UPP-Backend
    ```
3. Copy the json file to this folder.
4. Update .env file value :
a. In MONGODB enter connection string of MongoDB Atlas Cluster.
b. In the KEYFILE enter name of JSON file.
c. Enter JWT_KEY of your choice.
d. In BUCKET enter name of bucket you have created in Google Cloud Storage
5. Run the following command to install the node modules in your local system:
    ```sh
    npm install
    ```
6. Run the following command to run the project :

    ```sh
    npm run index.js
    ```

Voila! the backend server is running!

##### B. Setting up Angular Web Interface.

1.  Go to the directory : UPPWebInterface
    ```sh
    cd ANGULAR_WEB_FRONTEND/UPPWebInterface
    ```
2. Run the following command to install the node modules in your local system:
    ```sh
    npm install
    ```
3. To serve the project and open in the browser run the following command :
    ```sh
    ng serve --open
    ```
Wohoo! The web interface is running successfully!

##### C. Set up Flutter Mobile Interface. 

1.  Go to the directory : uniplacement
    ```sh
    cd FLUTTER_FROUNTEND/uniplacement
    ```
2. Run the following commands to install the flutter packages in your system.
    ```sh
    flutter pub get
    ```
3. To build the apk run :
    ```sh
    flutter build apk
    ```
4. To launch the apk generated in previous step run:
    ```sh
    flutter run apk
    ```
There we go! Our mobile app is running.
<!-- CONTRIBUTING -->
#### Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE` for more information.
 -->


<!-- CONTACT -->
#### Contact

Devanshee Vankani - [@devanshee07](https://twitter.com/devanshee07) - devansheevankani2000@gmail.com

Sahil Bhuva - [@BhuvaSahil](https://twitter.com/BhuvaSahil) - bhuvasahil@gmail.com

Project Link: [https://github.com/devanshee26/Plax-tech.git](https://github.com/devanshee26/Plax-tech)



<!-- ACKNOWLEDGEMENTS -->
#### References
* [Medium](https://medium.com/)
* [Flutter : pub.dev](https://pub.dev/)
* [Flutter Components : material.io](https://material.io/)
* [Stackoverflow](https://stackoverflow.com/)
* [Kaggle](https://www.kaggle.com/)




