var ListView = Backbone.View.extend({
  model: List,
  template: app.templates.list,
  tagName: 'section',

  events: {
    'click h1': 'showEditTitle',
    'keypress .editListTitleInput': 'saveTitleOnEnter',
    'blur .editListTitleInput': 'closeEditTitle',

    'click .deleteList': 'askDeleteList',
    'click .confirmDeleteList': 'deleteList',
    'click .cancelDeleteList': 'cancelDeleteList',

    'click .addCard': 'showAddCard',
    'keypress .addCardInput': 'createCardOnEnter',
    'blur .addCardInput': 'closeAddCard'
  },

  initialize: function() {
    this.listenTo(this.model.cards, 'add remove', this.render);
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.delegateEvents();

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    this.model.cards.each(function(card) {
      var view = new SimpleCardView({ model: card });

      this.$('ul').append(view.$el);
    }, this);
  },

  showEditTitle: function() {
    this.$('h1').addClass('hidden');
    this.$('.editListTitleInput').removeClass('hidden')
                            .val(this.model.get('title'))
                            .focus();
  },

  closeEditTitle: function() {
    this.$('h1').removeClass('hidden');
    this.$('.editListTitleInput').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('.editListTitleInput').val().trim() });
    }
  },

  showAddCard: function(event) {
    event.preventDefault();

    this.$('.addCard').addClass('hidden');
    this.$('.addCardInput').removeClass('hidden').focus();
  },

  closeAddCard: function() {
    this.$('.addCard').removeClass('hidden');
    this.$('.addCardInput').val('').addClass('hidden');
  },

  createCardOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      var title = this.$('.addCardInput').val().trim();

      this.model.cards.create({ title: title });
    }
  },

  toggleDeleteButtons: function() {
    this.$('.confirmDeleteList').slideToggle(150);
    this.$('.cancelDeleteList').slideToggle(150);
  },

  askDeleteList: function(event) {
    event.preventDefault();
    this.toggleDeleteButtons();
  },

  cancelDeleteList: function(event) {
    event.preventDefault();
    this.toggleDeleteButtons();
  },

  deleteList: function(event) {
    event.preventDefault();

    this.model.cards.destroyAll();
    this.model.destroy();
  }
});
