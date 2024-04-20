<p align="center">
  <a href="https://github.com/dal-dos/LearnSphere">
  <img width="100px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/9fb5a33f-f6d2-4d17-b3d3-f5b11f97cb1c" align="center"/> 
  </a>
</p>
<p align="center">
  <a href="https://github.com/dal-dos/LearnSphere">
  <img width="500px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/c86bc769-866b-4536-8508-9b018c84f80b" align="center"/>
  </a>
  <h2></h2>
 <h3 align="center">Make Learning Easy</h3>
<h6 align="center"><a href="http://learnsphere.cloud/">Website Preview</a></h6>
</p>


<p  align="center">
  <a href="https://console.cloud.google.com/">
  <img width="50px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/817af3d8-da97-4aaa-85e2-34b8cfae17e6" align="center"/>
  </a>
  <a href="https://nodejs.org/">
  <img width="50px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/d97df285-2326-4743-83bd-ded1bdc4cde9" align="center"/>
  </a>
  <a href="https://firebase.google.com/">
  <img width="50px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/c86f004e-83ba-44af-bc9a-96e2474931be" align="center"/>
  </a>
</p>

<h6 align="center"> For best viewing experience please use github dark mode </h6>

# Table of Contents
-   [About](#about)
-   [Services](#services)
-   [Releases](#releases)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Diagrams](#diagrams)
-   [Features](#features)
-   [Contributing](#contributing)
-   [Contributors](#contributors)

# About

LearnSphere is an educational platform designed to provide comprehensive learning materials and interactive lectures on a wide range of topics. With an easy-to-navigate interface and a variety of courses, LearnSphere aims to make learning accessible and engaging for everyone.

# Services

To ensure scalability, maintainability, and efficiency, LearnSphere has been architectured as a distributed system comprised of multiple microservices. These microservices, namely the authentication service, post service, and profile service, handle specific functionalities of the platform, enabling better organization, flexibility, and resilience.


<p>
  <a href="https://github.com/singhmeharjeet/learn-sphere-auth-service">
  <img width="300px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/b799ac54-1c46-4933-aca8-c12f047a5a19"/>
  </a>
</p>
    
Responsible for managing user authentication and authorization, ensuring secure access to LearnSphere's features and resources.

<p>
  <a href="https://github.com/singhmeharjeet/learn-sphere-post-service">
  <img width="300px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/b58cef35-44ea-4c2f-afe3-8bc0afc30d75"/>
  </a>
</p>

Handles the creation, retrieval, and management of educational content such as articles, tutorials, and discussions, facilitating seamless content delivery to users.

<p>
  <a href="https://github.com/singhmeharjeet/learn-sphere-profile-service">
  <img width="300px" src="https://github.com/dal-dos/LearnSphere/assets/32851308/174c9e2e-66c0-4d77-887e-d22b6b8f8d73"/>
  </a>
</p>

Manages user profiles, preferences, and interactions within the platform, providing personalized experiences and fostering community engagement.


The communication between the frontend and these microservices is orchestrated through an API Gateway. This gateway serves as a single entry point for client requests, abstracting the complexity of the underlying microservices architecture and providing a unified interface for frontend developers. Through this architecture, LearnSphere ensures modularity, scalability, and maintainability while delivering a cohesive user experience.

# Releases

[Release 1.0 Preview](http://learnsphere.cloud/)


# Prerequisites

Ensure you have the following installed on your system:

-   Node.js (v14 or newer)
-   npm (v6 or newer)

# Installation

1. Clone the [repository](https://github.com/dal-dos/LearnSphere) to your local machine.
2. Clone the [auth-service](https://github.com/singhmeharjeet/learn-sphere-auth-service) repository to your local machine.
3. Clone the [post-service](https://github.com/singhmeharjeet/learn-sphere-post-service) repository to your local machine.
4. Clone the [profile-service](https://github.com/singhmeharjeet/learn-sphere-profile-service) repository to your local machine.
5. Navigate to the project directories
6. Open a terminal in all four directories
7. Install the dependencies in all four directories: npm install
8. Each services needs a .env file with your MY_SECRET, private_key_id, and private_key. Note the .env file should be created in each service directory root folder with 3 .env files total.

# Running the Application

To run LearnSphere on your local machine, execute: npm start in each of the four directories
This will start the development server for the front end and each of the services.

To open the program within your browser, enter 'o' + 'Enter' into the terminal.
To close the program, enter 'q' + 'Enter' into the terminal.

# Diagrams


![Diagram](https://github.com/dal-dos/LearnSphere/assets/32851308/4fda0d75-5635-4aa3-bb29-4d7e52d2f84b)
![Secure](https://github.com/dal-dos/LearnSphere/assets/32851308/8cefb6a1-8e96-4120-bf3c-90a7171bdd1b)
![Fast](https://github.com/dal-dos/LearnSphere/assets/32851308/87abaf7d-5e06-4e8f-b37c-848ee076f984)
![Simple](https://github.com/dal-dos/LearnSphere/assets/32851308/3729b867-f279-46ff-ae44-714b08c381d6)

# Features

-   Interactive lectures on various subjects
-   Quizzes to test your knowledge
-   Progress tracking for each courser
-   User profiles and customization options

# Contributing

We welcome contributions to LearnSphere! If you're interested in helping, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

# Contributors
- [Dalveer Dosanjh](https://github.com/dal-dos)
- [Arjun Singh](https://github.com/ashokar19)
- [Meharjeet Singh](https://github.com/singhmeharjeet)
- [Akash Devgan](https://github.com/Akashdevgan02)
- [Gursahib Badwal](https://github.com/gursahib-badwal)


