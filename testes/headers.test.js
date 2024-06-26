const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("The header has correct text", async () => {
  const text = await page.getContentOf("a.brand-logo");

  expect(text).toEqual("Blogster");
});

test("After login goes to o-auth flow", async () => {
  await page.click(".right a");

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in , show the logout button", async () => {
  await page.login();
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);
  expect(text).toEqual("Logout");
});
