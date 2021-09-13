# Learning Docker

## Basics

### Configuration file
Create a file named ```Dockerfile```. This file will contain all the instructions to build our Docker image.

**_Example content:_**
```dockerfile
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
```yml
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

### Differenciation between ```development``` and ```production```
Change the content of ```docker-compose.yml``` to this:
```yml
version: "3"
services: 
  node-app:
    build: .
    ports: 
      - "3000:3000"
    environment: 
      - PORT=3000
```
Then create 2 files ```docker-compose.dev.yml``` and ```docker-compose.prod.yml``` respectively for development and production environments.
```yml
# docker-compose.dev.yml content
version: "3"
services: 
  node-app:
    build: 
      context: .
      args: 
        NODE_ENV: development
    volumes: 
      - "./:/app"
      - "/app/node_modules"
    environment: 
      - NODE_ENV=development
    command: npm run dev
```
```yml
# docker-compose.prod.yml content
version: "3"
services: 
  node-app:
    build: 
      context: .
      args: 
        NODE_ENV: production
    environment: 
      - NODE_ENV=production
    command: node index.js
```
Each one of these files overrides parts of the configuration for ```docker-compose.yml``` according to the target environment.

#### Start dev
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

#### Stop dev
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

#### Start prod
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

#### Stop prod
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```
The ```--build``` option forces image rebuild, the ```-v``` option when destroying containers removes the associated volumes

### Adding MongoDB
Add MongoDB as a service in ```docker-compose.yml```
```yml
version: "3"
services: 
  node-app:
    build: .
    ports: 
      - "3000:3000"
    environment: 
      - PORT=3000
    depends_on: 
      - mongo

  mongo:
    image: mongo
    environment: 
      - MONGO_INITDB_ROOT_USERNAME=gprodev
      - MONGO_INITDB_ROOT_PASSWORD=mypassword
    volumes: 
      - mongo-db:/data/db

volumes: 
  mongo-db:
```
Using a named volume allows our mongo container to preserve its database between restart.

**_Caution:_** At this point avoid using the flag ```-v``` when running ```docker-compose ... down``` as it will delete volumes including named ones, thus deleting the database.
