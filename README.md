# Screwfix E2E Test Readme

## Setup guide

You will need [Node.js](https://nodejs.org/en/download/current)

Once you have it you can install Playwright using
`npx install playwright chrome`

Clone the repository and run `npm install` to get the tests set up.

Create a `.env` file in the project root and populate it  as shown below

```
LOCALE=
EMAIL=
PASSWORD=
UK_POSTCODE=""
UK_ADDRESS=""
IE_POSTCODE=""
IE_ADDRESS=""
```

`LOCALE` can be set to either `uk` or `ie` depending on which site you want to test

`EMAIL` should be an existing email from an account you have created

`PASSWORD` should be that account's password

`**_POSTCODE` an existing postcode for that locale

`**_ADDRESS` an existing address for that locale
