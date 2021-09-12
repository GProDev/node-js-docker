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

#### Sync local folder to container folder
```
docker run -d -v <local-folder>:<container-folder> -p <local-port>:<app-port> --name <container-name> <docker-image-name>
```
The ```-v``` option can be used multiple times to sync multiple folders.
**_Example:_**
```
docker run -d -v $PWD:/app -p 3000:8080 --name my-app my-app-image
```
On Mac OS, ```$PWD``` represent the current folder.

#### Use environment variables
```
docker run -d -e <env-var-name>=<env-var-value> -p <local-port>:<app-port> --name <container-name> <docker-image-name>
```
The ```-e``` option is equivalent to ```--env``` and can be used multiple times for multiple environment variables

### Login into container bash
```
docker exec -it node-app bash
```

### 