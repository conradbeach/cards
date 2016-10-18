var Router = Backbone.Router.extend({
  routes: {
    '': 'default',
    ':id': 'showCard'
  },

  default: function() {
    app.removeCurrentCardView();
  },

  showCard: function(id) {
    app.showCard(id);
  }
});

app.router = new Router();
Backbone.history.start();
