var ListView = Backbone.View.extend({
  model: List,
  template: app.templates.list,
  tagName: 'section',

  events: {
    'click h1': 'showEditTitle',
    'blur .editListTitleInput': 'closeEditTitle',
    'keypress .editListTitleInput': 'saveTitleOnEnter',

    'click .deleteList': 'askDeleteList',
    'click .cancelDeleteList': 'cancelDeleteList',
    'click .confirmDeleteList': 'deleteList',

    'click .addCard': 'showAddCard',
    'blur .addCardInput': 'closeAddCard',
    'keypress .addCardInput': 'createCardOnEnter',

    'sortupdate ul': 'updateCardPositions',
    'updateListPosition': 'updatePosition',

    'sortreceive ul': 'receiveCard'
  },

  initialize: function() {
    this.listenTo(this.model.cards, 'add remove', this.render);
    this.listenTo(this.model, 'sync', this.render);
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

    this.$('ul').sortable({
      connectWith: '.sortableCards'
    }).disableSelection();
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
    var title;

    if (event.which === ENTER_KEY) {
      title = this.$('.editListTitleInput').val();

      this.model.save({ title: title });
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
    var title;

    if (event.which === ENTER_KEY) {
      title = this.$('.addCardInput').val();

      this.model.cards.create({ title: title });
    }
  },

  updateCardPositions: function(event) {
    if (event) { event.stopImmediatePropagation(); }

    this.$('ul li').each(function(index, card) {
      $(card).trigger('updateCardPosition');
    });

    this.model.cards.sort();
  },

  updatePosition: function() {
    this.model.set('position', this.$el.index() + 1);
    this.model.save();
  },

  receiveCard: function(event, ui) {
    this.updateCardPositions();
    ui.item.trigger('transferCardTo', { collection: this.model.cards });
  }
});
