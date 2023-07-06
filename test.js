const test = require("node:test");
const StrapiEz = require("./index.js");
const baseURL = "http://54.162.104.139:1337/";

test("test", async (t) => {
  const query = new StrapiEz()
    .baseURL(baseURL)
    .page(1, 1)
    .fields("updatedAt")
    .sort("updatedAt:desc");

  t.test("get", () => {
    let q = query.get();
    console.log(q);
  });
});
