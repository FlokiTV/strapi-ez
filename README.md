# Strapi EZ
### the easiest way to build strapi queries 🚀

```js

const { default: axios } = require("axios");
const StrapiQuery = require("./strapi");
const baseURL = "http://127.0.0.1:1337/";
const $axios = axios.create({
  baseURL,
});

let q = new StrapiQuery()
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

console.log(q);

$axios.get(`api/offers?${q}`).then((response) => {
  console.log(response.data.data);
});
```