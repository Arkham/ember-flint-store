App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('about');
  this.route('credits', { path: '/thanks' });
  this.resource('products');
  this.resource('product', { path: "/products/:product_id" });
  this.resource('contacts');
  this.resource('contact', { path: "/contacts/:contact_id" });
});

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'images/logo.png',
  time: function() {
    return (new Date()).toDateString();
  }.property()
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
})

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
})

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
})

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
})

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Product.FIXTURES = [
  {
    id: 1,
    title: "Flint",
    price: 99,
    description: "Flint is good for your skin",
    isOnSale: true,
    image: "images/products/flint.png",
    reviews: [100, 101],
    crafter: 1
  },
  {
    id: 2,
    title: "Kindling",
    price: 99,
    description: "Easily kindling is very good for your health",
    isOnSale: false,
    image: "images/products/kindling.png",
    crafter: 2
  }
];

App.Contact.FIXTURES = [
  {
    id: 1,
    name: "Ju",
    avatar: "images/contacts/giamia.png",
    about: "Hell Boy",
    products: [1]
  },
  {
    id: 2,
    name: "Gio",
    avatar: "images/contacts/anostagia.png",
    about: "Yolo Yolo",
    products: [2]
  }
]

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
]
