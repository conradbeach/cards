var List = Backbone.Model.extend({
  defaults: {
    title: ''
  },

  initialize: function() {
    this.save();

    if (!this.get('position')) {
      this.set('position', this.collection.length + 1);
    }

    this.cards = new Cards(this.id);
    this.cards.fetch();
  }
});
