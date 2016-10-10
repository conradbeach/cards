var Cards = Backbone.Collection.extend({
  model: Card,

  initialize: function(listId) {
    this.localStorage = new Backbone.LocalStorage('card-backbone-' + listId);
  }
});
