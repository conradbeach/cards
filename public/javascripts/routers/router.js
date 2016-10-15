var Router = Backbone.Router.extend({
  routes: {
    ':id': 'default'
  },

  default: function(id) {
    app.showCard(id);
  }
});

app.router = new Router();
Backbone.history.start();
