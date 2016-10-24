var List = Backbone.Model.extend({
  defaults: {
    title: ''
  },

  initialize: function() {
    this.save(); // Save List first so it has an ID to pass to the new Cards
                 // collection on line 14. Otherwise, undefined is passed.

    if (!this.get('position')) {
      this.set('position', this.collection.length + 1);
    }

    this.cards = new Cards(this.id);
    this.cards.fetch();
  }
});
