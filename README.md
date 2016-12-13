# Chant

[![Build Status](https://travis-ci.org/mjhea0/chant.svg?branch=master)](https://travis-ci.org/mjhea0/chant)
[![Coverage Status](https://coveralls.io/repos/github/mjhea0/straw-poll/badge.svg?branch=master)](https://coveralls.io/github/mjhea0/straw-poll?branch=master)

Chant is a real-time polling app for binary decisions.

## Getting Started

1. Fork/Clone
1. Install dependencies - `npm install`
1. Rename the *.env_sample* file to *.env* and update
1. Create two local Postgres databases - `chant` and `chant_test`
1. Migrate - `knex migrate:latest --env development`
1. Seed - `knex seed:run --env development`
1. Run the development server - `gulp`

## Test

Without code coverage:

```sh
$ npm test
```

With code coverage:

```sh
$ npm run coverage
```

## Todo

1. Add jsdom tests
1. Remove cookie, add localstorage
