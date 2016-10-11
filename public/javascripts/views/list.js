var ListView = Backbone.View.extend({
  model: List,
  template: app.templates.list,
  tagName: 'section',

  events: {
    'click #add': 'showAddInput',
    'keypress #addInput': 'createOnEnter'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    this.model.cards.each(function(card) {
      var cardView = new SimpleCardView({ model: card });

      this.$('ul').prepend(cardView.$el);
    }, this);
  },

  add: function(event) {
    event.preventDefault();

    this.showAddInput();
  },

  showAddInput: function(event) {
    this.$('#add').addClass('hidden');
    this.$('#addInput').removeClass().focus();
  },

  createOnEnter: function(event) {
    var title;

    if (event.which === ENTER_KEY) {
      title = this.$('#addInput').val().trim();

      this.model.cards.create({ title: title });

      this.render();
    }
  }
});
