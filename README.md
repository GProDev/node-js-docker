# Learning Docker

## Basics

### Configuration file
Create a file named ```Dockerfile```. This file will contain all the instructions to build our Docker image.

**_Example content:_**
```
FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD [ "node", "index.js" ]
```

### Build Docker image
```
docker build . -t <image-name> <base-folder>
```

**_Example:_**
```
docker build -t node-app-image .
```

### Run container
```
docker run -d -p <local-port>:<app-port> --name <container-name> <docker-image-name>
```
**_Example:_**
```
docker run -d -p 3000:8080 --name my-app my-app-image
```

### Login into container bash
```
docker exec -it node-app bash
```

### Sync local folder to container folder
```
docker run -d -v <local-folder>:<container-folder> -p <local-port>:<app-port> --name <container-name> <docker-image-name>
```
The ```-v``` option can be used multiple times to sync multiple folders.
**_Example:_**
```
docker run -d -v $PWD:/app -p 3000:8080 --name my-app my-app-image
```
On Mac OS, ```$PWD``` represent the current folder.

### Use environment variables
```
docker run -d -e <env-var-name>=<env-var-value> -p <local-port>:<app-port> --name <container-name> <docker-image-name>
```
The ```-e``` option is equivalent to ```--env``` and can be used multiple times for multiple environment variables

### Use env-file
Create a file that will contain environment variables (e.g ```.env```).
**_Example content:_**
```
PORT=4000
```
Then use the option ```--env-file``` to pass this file
```
docker run -d --env-file <env-file-path> -p <local-port>:<container-port> --name <container-name> <docker-image-name>
```
**_Example:_**
```
docker run -d --env-file ./.env -p 3000:8080 --name node-app node-app-image
```
### Delete a container
```
docker rm <container-name> -fv
```
The ```-f``` option forces the deletion of the container even if it's running, the option ```-v``` deletes the volume associated with the container.

## docker-compose
Basically **docker-compose** allows to manage multiple containers from a single configuration.

### Configuration file
Create a file named ```docker-compose.yml``` that will contain the configuration instructions.

**_Example:_**
```
version: "3"
services: 
  node-app:
    build: .
    ports: 
      - "3000:3000"
    volumes: 
      - ./:/app
      - /app/node_modules
    environment: 
      - PORT=3000
    # env_file: 
    #   - .env
```

### Run containers
```
docker-compose up -d --build
```
The ```--build``` option is used to force build.

### Stop/delete containers
```
docker-compose down -v
```
