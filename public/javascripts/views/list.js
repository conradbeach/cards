var ListView = Backbone.View.extend({
  model: List,
  template: app.templates.list,
  tagName: 'section',

  events: {
    'click h1': 'showEditTitle',
    'keypress #edit': 'saveTitleOnEnter',
    'blur #edit': 'closeEditTitle',
    'click #add': 'showAddCard',
    'keypress #addInput': 'createCardOnEnter',
    'blur #addInput': 'closeAddCard'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    this.model.cards.each(function(card) {
      var cardView = new SimpleCardView({ model: card });

      this.$('ul').append(cardView.$el);
    }, this);
  },

  showEditTitle: function() {
    this.$('h1').addClass('hidden');
    this.$('#edit').removeClass()
                   .focus()
                   .val(this.model.get('title'));
  },

  closeEditTitle: function() {
    this.$('h1').removeClass();
    this.$('#edit').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('#edit').val().trim() });
      this.render();
    }
  },

  showAddCard: function(event) {
    event.preventDefault();

    this.$('#add').addClass('hidden');
    this.$('#addInput').removeClass().focus();
  },

  closeAddCard: function() {
    this.$('#add').removeClass();
    this.$('#addInput').val('').addClass('hidden');
  },

  createCardOnEnter: function(event) {
    var title;

    if (event.which === ENTER_KEY) {
      title = this.$('#addInput').val().trim();

      this.model.cards.create({ title: title });

      this.render();
    }
  }
});
