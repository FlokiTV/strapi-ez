const test = require("node:test");
const { default: axios } = require("axios");
const StrapiEz = require("./index.js");
const baseURL = "http://54.162.104.139:1337";
const $query = new StrapiEz();

test("test", async (t) => {
  t.test("set", () => {
    $query
      .baseURL(baseURL)
      .endpoint("categories")
      .populate("*")
      // .page(1, 1)
      // .fields("updatedAt")
      .sort("updatedAt:desc");
  });

  await t.test("get", async () => {
    let query = $query.get();
    // console.log(query.replace("%2A", "*"))
    console.log(query)
    let data = await axios.get(query);
    console.log(data.data.data);
  });
});
