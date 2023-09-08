# Strapi EZ
> The easiest way to build strapi queries 🚀  

The StrapiEz class provides a convenient way to construct queries for interacting with a Strapi API. It offers various methods to set filters, specify fields, sort results, paginate data, and more. Here's an overview of the features and usage of the StrapiEz class:

## Usage
To get started, create an instance of the StrapiEz class. You can optionally pass a base URL to the constructor. If you don't pass a base URL, you'll need to pass a full URL to the endpoint method.
To specify the fields that should be returned by the API, call the fields method with the fields you wish to retrieve. You may call the fields method multiple times to chain additional fields onto the query. If you don't call the fields method, all fields will be returned.
If you need to populate specific fields in the response, you may use the populate method. The populate method accepts the name of the relationship that should be populated. You may call the populate method multiple times to chain additional relationships onto the query.
To filter the results returned by the API, you may use the where method. The where method accepts three arguments: the field to filter by, the operator, and the value to filter against.

## Example
```js
const { axios } = require("axios");
const StrapiEz = require("./strapi");

const baseURL = "https://127.0.0.1:1337";
 

// Create a new instance of the StrapiEz class
let queryString = new StrapiEz()
  // Set the base URL to "
  .baseURL(baseURL)
  // Set the endpoint to "api/offers"
  .endpoint('api/offers')
  // Filter by offers in the "live" state
  .state("live")
  // Select only the "title" field
  .fields("title")
  // Populate the "categories" field
  .populate("categories", "categories.Icon")
  // Sort the results by the "title" field in descending order
  .sort("title:desc")
  // Set the page to the first page with 25 items per page
  .page(1, 25)

  // Add an "AND" condition for the "categories.title" field, checking for values "food" or "toys"
  .and("categories", "slug").in("food", "toys") 

  // Add an "OR" condition for the "title" field, checking if it ends with "mia"
  .or("title").endsWith("mia")

  // Get the final query string
  .get();

console.log(queryString);
// https://127.0.0.1:1337/api/offers?filters[$and][0][categories][slug][$in][0]=teste&filters[$and][0][categories][slug][$in][1]=alimentacao&filters[$or][0][title][$endsWith][0]=mia&publicationState=live&fields[0]=title&populate[0]=categories&sort[0]=title%3Adesc&pagination[page]=1&pagination[pageSize]=25&pagination[withCount]=true

// Make a GET request to the API with the constructed query string
axios.get(queryString).then((response) => {
  console.log(response.data.data);
});

```

```
