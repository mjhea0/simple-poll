#!/bin/bash

docker-compose run app knex migrate:latest --env development --knexfile knexfile.js
docker-compose run app knex seed:run --env development --knexfile knexfile.js
