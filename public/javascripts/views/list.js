var ListView = Backbone.View.extend({
  model: List,
  template: app.templates.list,
  tagName: 'section',

  events: {
    'click h1': 'showEditTitle',
    'keypress #editListTitle': 'saveTitleOnEnter',
    'blur #editListTitle': 'closeEditTitle',

    'click #deleteList': 'deleteList',

    'click #addCard': 'showAddCard',
    'keypress #addCardInput': 'createCardOnEnter',
    'blur #addCardInput': 'closeAddCard'
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
    this.$('#editListTitle').removeClass()
                   .focus()
                   .val(this.model.get('title'));
  },

  closeEditTitle: function() {
    this.$('h1').removeClass();
    this.$('#editListTitle').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('#editListTitle').val().trim() });
      this.render();
    }
  },

  showAddCard: function(event) {
    event.preventDefault();

    this.$('#addCard').addClass('hidden');
    this.$('#addCardInput').removeClass().focus();
  },

  closeAddCard: function() {
    this.$('#addCard').removeClass();
    this.$('#addCardInput').val('').addClass('hidden');
  },

  createCardOnEnter: function(event) {
    var title;

    if (event.which === ENTER_KEY) {
      title = this.$('#addCardInput').val().trim();

      this.model.cards.create({ title: title });

      this.render();
    }
  },

  deleteList: function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    // TODO: Add a confirmation pane for deleting.
    var confirmed = confirm('Are you sure you want to delete this list?');

    if (confirmed) {
      this.model.destroy();
      this.remove();
    }
  }
});
