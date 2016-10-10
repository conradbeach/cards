var SimpleCardView = Backbone.View.extend({
  model: Card,
  tagName: 'li',
  template: app.templates.simple_card,

  events: {
    'click a': 'viewCard'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  viewCard: function(event) {
    event.preventDefault();

    app.trigger('viewCard', this.model);
  }
});
