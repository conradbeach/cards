var Cards = Backbone.Collection.extend({
  model: Card,

  initialize: function(listId) {
    this.localStorage = new Backbone.LocalStorage('card-backbone-' + listId);
  },

  destroyAll: function() {
    _.each(_.clone(this.models), function(card) {
      card.destroy();
    });
  }
});
