# cataloge-service
service for maintaining different groups of catalogues, currently its used for creating and managing books

## API documentation
API docs can be accessed using swagger ui once the application is started, with the following ulr

http://localhost:3000/v1/docs/

use the required url based on your deployment environment

## setup and run application locally

use the following command to install required dependencies for this project

```bash
  yarn
```

use the following command to start the application in development mode

```bash

npm run dev

```

use the following command to start the application in production mode

```bash
  npm run start
```

## considerations while enbling the apis

- Used rate limiter for the api for controlling the usage
- used pagenated apis for optimized querying
- used validators for validating the api request

