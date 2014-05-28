App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('about');
  this.route('credits', { path: '/thanks' });
  this.resource('products');
});

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'images/logo.png',
  time: function() {
    return (new Date()).toDateString();
  }.property()
});

App.PRODUCTS = [
  {
    title: "Flint",
    price: 99,
    description: "Flint is good for your skin",
    isOnSale: true,
    image: "images/products/flint.png"
  },
  {
    title: "Kindling",
    price: 99,
    description: "Easily kindling is very good for your health",
    isOnSale: false,
    image: "images/products/kindling.png"
  }
];

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return App.PRODUCTS;
  }
})
