var Router = Backbone.Router.extend({
  routes: {
    ':id': 'default'
  },

  default: function(id) {
    app.viewCard(id);
  }
});

app.router = new Router();
Backbone.history.start();
