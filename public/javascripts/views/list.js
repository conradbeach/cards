var ListView = Backbone.View.extend({
  model: List,
  template: app.templates.list,
  tagName: 'section',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    this.model.cards.each(function(card) {
      var cardView = new SimpleCardView({ model: card });

      this.$('ul').append(cardView.$el);
    }, this);
  }
});
