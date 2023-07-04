# Strapi EZ
### the easiest way to build strapi queries 🚀

```js

const { default: axios } = require("axios");
const StrapiQuery = require("./strapi");
const baseURL = "http://127.0.0.1:1337/";
const $axios = axios.create({
  baseURL,
});

let queryString = new StrapiQuery()
  .endpoint('api/offers')
  .state("live")
  .fields("title")
  .populate("categories")
  // sort
  .sort("title:desc")
  // pagination
  .page(1, 25)
  // condition
  .and("categories", "slug") // categories.slug
  .in("teste", "alimentacao") //filter
  .or("title") // condition
  .endsWith("mia") //filter
  // render query string
  .get();

console.log(queryString);
// api/offers?filters[$and][0][categories][slug][$in][0]=teste&filters[$and][0][categories][slug][$in][1]=alimentacao&filters[$or][0][title][$endsWith][0]=mia&publicationState=live&fields[0]=title&populate[0]=categories&sort[0]=title%3Adesc&pagination[page]=1&pagination[pageSize]=25&pagination[withCount]=true

$axios.get(q).then((response) => {
  console.log(response.data.data);
});
```