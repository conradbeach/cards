var Card = Backbone.Model.extend({
  defaults: {
    title: '',
    description: '',
    comments: []
  },

  initialize: function() {
    if (!this.get('position')) {
      this.set('position', this.collection.length + 1);
    }
  }
});
