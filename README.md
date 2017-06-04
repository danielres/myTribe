# Docker-Node-React test project

This project is a personal experiment for running an app with a frontend and a backend inside a single Docker container, and being able to deploy it easily, for example on Digital Ocean's cheapest instance (5$/month).

This might hopefully become a very convenient base for rapid development of simple applications with a small amount of users, with the ability to scale up easily if necessary.

The app is composed of:

- a frontend (create-react-app)
- a backend (express.js)

The goal of this project is to be able to use Docker in development as well as in production, and to have a full CI/CD working automated flow.

In development:

- The express server receives the calls, handles api calls itself, and proxies everything else to the frontend dev server.

In production:

- First, the frontend is compiled to static assets. 
- The express server still handles the api calls, but now serves the frontend as simple static files.

Deployment:

- The source code is hosted on Github. 
- Th build and deployment are triggered with a simple `git push` to the master branch.
- This example uses the Docker cloud service to watch the github repo, and handle builds and deploys automatically, but you could also probably use other CI tools instead, like Travis, Codeship,...

## Setting up the Docker host:

For this project, the Docker host is a minimal Digital Ocean droplet for 5$/month (512 mb RAM, 20Gb Disk) running a Digital Ocean's standard Ubuntu 14.04.

This is the cheapest option available and comes with limitations that require some little tweaks. The main problem is that the droplet doesn't have enough RAM to be able to complete the `npm install` (or `yarn install`) command. 

Luckily, we have enough hard more than enough disk space for us to set up a 1Gb swapfile, which solves our probem.

### Setting up the swapfile (tested on Ubuntu):

Access the host's terminal through ssh, then run the following command on the host:

`fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && sudo swapon /swapfile && swapon --show`

This will create the swapfile needed for the node modules installation to complete.
