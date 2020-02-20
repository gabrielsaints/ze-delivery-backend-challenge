# Backend challenge - Zé Delivery

The ideia is to create an API to store and get partners, where the partner have a coverage area and address. This API Rest was made using NodeJS and MongoDB.

```
OBS: This software is part of a programming test, so everything that has been implemented is fictionalized.
```

## Pre-requisites

- [Docker](https://docker.com) version 17 or higher

  ```bash
  # determine docker version
  docker -v
  ```

- [docker-compose](https://github.com/docker/compose) version 1.10 or higher

  ```bash
  # determinate docker-compose version
  docker-compose -v
  ```

- [Node.js](https://nodejs.org) version 13.0 or higher

  ```bash
  # determine node version
  node --version
  ```

- [MongoDB](https://www.mongodb.com/) version 4.2 or higher

---

## Getting started

- Clone the repository

  ```bash
  git clone https://github.com/cahtyw/ze-code-backend-challenge

  cd ze-code-backend-challenge
  ```

- Setup the environment variables

  ```bash
  cp .env.example .env

  vi .env
  ```

  example .env file

  ```bash
  ENVIRONMENT=development
  MONGOOSE_DEBUG=off
  PORT=3333

  # MONGO CONNECTION
  MONGO_HOST=127.0.0.1
  MONGO_PORT=27017
  MONGO_DB_NAME=ze-delivery
  ```

- Create docker container

  ```bash
  docker-compose up -d
  ```

---

## To execute this code

- Install modules

  ```bash
  npm install
  # or
  yarn
  ```

- Start the project

  ```bash
  npm start
  #or
  yarn start
  ```

## To execute the tests

- Execute all tests (unit tests and integration tests)

  ```bash
  npm test
  # or
  yarn test
  ```

- Execute coverage test

  ```bash
  npm run test:coverage
  # or
  yarn test:coverage
  ```

## Routes explanation

### Route POST /partners

#### Description

- This route is responsible for registering a new partner. For this, the user must pass some information in json format.

#### Body Parameters

```json
{
  "tradingName": "Bar do Ze",
  "ownerName": "Joao Silva",
  "document": "04698149428",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [
        [
          [-38.56586, -3.85041],
          [-38.49599, -3.87361],
          [-38.45033, -3.90358],
          [-38.42304, -3.90273],
          [-38.37892, -3.88971],
          [-38.35566, -3.8844],
          [-38.39557, -3.82497],
          [-38.41531, -3.80133],
          [-38.42771, -3.76754],
          [-38.44251, -3.75054],
          [-38.45672, -3.75024],
          [-38.46562, -3.74746],
          [-38.46525, -3.74657],
          [-38.46616, -3.74458],
          [-38.46507, -3.74083],
          [-38.47256, -3.73743],
          [-38.47844, -3.72759],
          [-38.49002, -3.72476],
          [-38.49573, -3.72254],
          [-38.51226, -3.71384],
          [-38.51736, -3.74292],
          [-38.52517, -3.7681],
          [-38.53095, -3.78294],
          [-38.53415, -3.79124],
          [-38.5412, -3.79573],
          [-38.55148, -3.80326],
          [-38.55796, -3.82],
          [-38.5656, -3.84839],
          [-38.56586, -3.85041]
        ]
      ]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [-38.495586, -3.809936]
  }
}
```

---

### Route GET /partners

#### Description

- This route is used for list all the included partners.

#### Parameters

- No parameters are required.

---

### Route GET /partners/:id

#### Description

- This route is used for list a partner.

#### Parameters

- **id**: identification of partner

---

### Route GET /partners/nearby

#### Description

- This route is responsible for a search a nearby partner based on provided geolocation (latitude and longitude)

#### Query Parameters

```json
{
  "latitude": -23.6142,
  "longitude": -46.627
}
```

---

## Other

```
  **Note 1:** A insomnia collection json is provided
  **Note 2:** Maybe you can find some grammatical errors, please ignore them. I am trying to improve.
```
