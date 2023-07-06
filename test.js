const test = require("node:test");
const { default: axios } = require("axios");
const StrapiEz = require("./index.js");
const baseURL = "http://54.162.104.139:1337";
const query = new StrapiEz();

test("test", async (t) => {
  query
    .baseURL(baseURL)
    .endpoint("categories")
    .populate("*")
    .page(1, 1)
    .fields("updatedAt")
    .sort("updatedAt:desc");

  t.test("get", async () => {
    let data = await axios.get(query.get())
    console.log(data.data)
  });
});
