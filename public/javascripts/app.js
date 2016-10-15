var ENTER_KEY = 13;

var app = {
  templates: JST,

  eachCard: function(callback, context) {
    if (!context) { context = this; }

    this.lists.each(function(list) {
      list.cards.each(function(card) {
        callback.call(context, card);
      });
    });
  },

  viewCard: function(id) {
    var model;
    var view;

    this.eachCard(function(card) {
      if (card.get('id') === id) {
        model = card;
      }
    });

    if (model) {
      this.currentCardView = new CardView({ model: model });
      $('aside').append(this.currentCardView.$el);
      $('aside').removeClass('hidden');
    } else {
      this.router.navigate('#', { trigger: true });
    }
  },

  shouldCloseCard: function(event) {
    if (event.target === $('aside')[0]) {
      this.closeCard();
    }
  },

  closeCard: function() {
    this.currentCardView.remove();
    delete this.currentCardView;
    $('aside').addClass('hidden');
    this.router.navigate('#', { trigger: true });
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
$('aside').on('click', app.shouldCloseCard.bind(app));

Handlebars.registerHelper('formatDate', function(date) {
  var dateObj = new Date(date);

  return dateObj.toString();
});
