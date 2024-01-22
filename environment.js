
require('dotenv').config();

let locale = process.env.LOCALE

function setBaseUrl() {
    let domain
    let serverInt

    switch (locale) {
        case 'uk':
            domain = "com"
            serverInt = '2'
            break;

        case 'ie':
            domain = locale
            serverInt = '3'
            break;
      }

    return `https://int${serverInt}.dev.screwfix.${domain}`
}

function setAddressDetails() {
    let address
    let postcode
    let postcodeLabel

    switch (locale) {
        case 'uk':
            address = process.env.UK_ADDRESS
            postcode = process.env.UK_POSTCODE
            postcodeLabel = "postcode"  
            break;

        case 'ie':
            address = process.env.IE_ADDRESS
            postcode = process.env.IE_POSTCODE
            postcodeLabel = "eircode"
            break;
    }

    return {address, postcode, postcodeLabel}
}

const addressDetails = setAddressDetails()
const baseUrl = setBaseUrl()

module.exports = { addressDetails, baseUrl }