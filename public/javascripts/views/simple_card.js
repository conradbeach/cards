var SimpleCardView = Backbone.View.extend({
  model: Card,
  tagName: 'li',
  template: app.templates.card,

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }
})
