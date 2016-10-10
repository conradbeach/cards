var CardView = Backbone.View.extend({
  el: 'aside',
  template: app.templates.card,

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }
});
