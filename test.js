const test = require("node:test");
const StrapiEz = require("./index.js");
const baseURL = "http://54.162.104.139:1337";

const query = new StrapiEz();
test("test", async (t) => {
  
  query
    .baseURL(baseURL)
    .endpoint("categories")
    .page(1, 1)
    .fields("updatedAt")
    .sort("updatedAt:desc");

  t.test("get", () => {
    let q = query.get();
    console.log(q);
  });
});
