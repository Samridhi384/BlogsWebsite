// console.clear();

// class Page {
//   goto() {
//     console.log("I am going to another page");
//   }
//   setCookie() {
//     console.log("I am setting cookie");
//   }
// }

// class CustomPage {
//   constructor(page) {
//     this.page = page;
//   }

//   login() {
//     this.page.goto("localhost:3000");
//     this.page.setCookie();
//   }
// }

// const page = new Page();
// const customPage = new CustomPage(page);
// customPage.login();
// customPage.page.goto();  //here i want this customPage to handle the page & not include by us

//to achieve this we want someone to manage access to handle all methods for that we require proxy

// class Greeting {
//   english() {
//     console.log("hello");
//   }
//   spanish() {
//     console.log("hola");
//   }
// }

// class MoreGreeting {
//   german() {
//     console.log("hallo");
//   }
//   french() {
//     console.log("bonjour");
//   }
// }

// const greeting = new Greeting();
// const moreGreeting = new MoreGreeting();

// const allGreetings = new Proxy(moreGreeting, {
//   get: (target, property) => {
//     return target[property] || greeting[property];
//   },
// });

// console.log(allGreetings.english());

//so correcting the code on first

console.clear();

class Page {
  goto() {
    console.log("I am going to another page");
  }
  setCookie() {
    console.log("I am setting cookie");
  }
}

class CustomPage {
  constructor(page) {
    this.page = page;
  }

  login() {
    this.page.goto("localhost:3000");
    this.page.setCookie();
  }
}

const page = new Page();
const customPage = new CustomPage(page);

const superPage = new Proxy(customPage, {
  get: function (target, property) {
    return target[property] || page[property];
  },
});

superPage.login();
superPage.goto();
superPage.setCookie();
