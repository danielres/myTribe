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


## Setting up the Docker host:

For this project, the Docker host is a simple Digital Ocean 5$/month droplet.
This is the cheapest option available and comes with limitations that require some little tweaks. The problem is that the droplet doesn't have enough RAM to be able to complete the `npm install` (or `yarn install`) command. Luckily, we have enough hard disk space to set up a swapfile, which solves our probem.

### Setting up the swapfile (tested on Ubuntu):

Access the host's terminal through ssh, then run the following command on the host:

`fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && sudo swapon /swapfile && swapon --show`
