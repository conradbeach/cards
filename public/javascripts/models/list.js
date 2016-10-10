var List = Backbone.Model.extend({
  defaults: {
    title: ''
  },

  initialize: function() {
    this.cards = new Cards(this.id);
    this.cards.fetch();
  }
});
