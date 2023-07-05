const test = require("node:test");
const StrapiEz = require("./index.js");

test("test", async (t) => {
  const query = new StrapiEz();

  t.test("get", () => {
    query.get();
  });
});
