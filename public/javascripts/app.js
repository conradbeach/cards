var ENTER_KEY = 13;

var app = {
  templates: JST,

  viewCard: function(model) {
    var view = new CardView({ model: model });

    // TODO: Make sure you remove this view after it's done being used.
  },

  eachCard: function(callback, context) {
    if (!context) { context = this; }

    this.lists.each(function(list) {
      list.cards.each(function(card) {
        callback.call(context, card);
      });
    });
  },

  search: function(query) {
    if (query.trim() === '') { return []; }

    var matchingCards = [];
    var pattern = new RegExp(query.trim().toLowerCase(), 'i');

    this.eachCard(function(card) {
      var title = card.get('title');
      var description = card.get('description');

      if (title.match(pattern) || description.match(pattern)) {
        matchingCards.push(card);
      }
    });

    return matchingCards;
  }
};

_.extend(app, Backbone.Events);

app.on('viewCard', app.viewCard);

Handlebars.registerHelper('formatDate', function(date) {
  var dateObj = new Date(date);

  return dateObj.toString();
});
