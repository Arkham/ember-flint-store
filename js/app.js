// Create ember app

App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

// Router

App.Router.map(function() {
  this.route('about');
  this.route('credits', { path: '/thanks' });
  this.resource('products', function() {
    this.route('onsale');
  });
  this.resource('product', { path: "/products/:product_id" });
  this.resource('contacts');
  this.resource('contact', { path: "/contacts/:contact_id" });
});

// Routes

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.ProductsOnsaleRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('products').filterBy('isOnSale');
  },
  renderTemplate: function(controller) {
    this.render('products/index', { controller: controller });
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
});

// Controllers

App.IndexController = Ember.ArrayController.extend({
  productsCount: Ember.computed.alias('length'),

  logo: 'images/logo.png',

  time: function() {
    return (new Date()).toDateString();
  }.property(),

  onSale: function() {
    return this.filterBy('isOnSale').slice(0, 3);
  }.property('@each.isOnSale')
});

App.ProductsController = Ember.ArrayController.extend({
  sortProperties: ['title']
});

App.ContactsController = Ember.ArrayController.extend({
  sortProperties: ['name']
});

// Models

App.Product = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('string'),
  reviews: DS.hasMany('review', { async: true }),
  crafter: DS.belongsTo('contact')
});

App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  about: DS.attr('string'),
  avatar: DS.attr('string'),
  products: DS.hasMany('product', { async: true })
});

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
});

// Adapter and fixtures

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Product.FIXTURES = [
  {
    id: 1,
    title: "Flint",
    price: 99,
    description: "Flint is good for your skin",
    isOnSale: false,
    image: "images/products/flint.png",
    reviews: [100, 101],
    crafter: 1
  },
  {
    id: 2,
    title: "Kindling",
    price: 99,
    description: "Easily kindling is very good for your health",
    isOnSale: true,
    image: "images/products/kindling.png",
    crafter: 2
  },
  {
    id: 3,
    title: "Birch",
    price: 99,
    description: "Hardly birch is very good for your health",
    isOnSale: true,
    image: "images/products/birch.png",
    crafter: 2
  },
  {
    id: 4,
    title: "Tinder",
    price: 12,
    description: "Commonly tinder is very good for your health",
    isOnSale: false,
    image: "images/products/tinder.png",
    crafter: 1
  }
];

App.Contact.FIXTURES = [
  {
    id: 1,
    name: "Ju",
    avatar: "images/contacts/giamia.png",
    about: "Hell Boy",
    products: [1, 4]
  },
  {
    id: 2,
    name: "Gio",
    avatar: "images/contacts/anostagia.png",
    about: "Yolo Yolo",
    products: [2, 3]
  }
];

App.Review.FIXTURES = [
  {
    id: 100,
    product: 1,
    text: "Started a fire in no time"
  },
  {
    id: 101,
    product: 1,
    text: "Not the brightest flame, but warm!"
  }
];
