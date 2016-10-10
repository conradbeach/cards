var app = {
  templates: JST,

  viewCard: function(model) {
    var view = new CardView({ model: model });

    view.render();

    // TODO: Make sure you remove this view after it's done being used.
  }
};

_.extend(app, Backbone.Events);

app.on('viewCard', app.viewCard)
