var ListView = Backbone.View.extend({
  model: List,
  template: app.templates.list,
  tagName: 'section',

  events: {
    'click h1': 'showEdit',
    'keypress #edit': 'saveOnEnter',
    'click #add': 'showAdd',
    'keypress #addInput': 'createOnEnter'
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

  showEdit: function() {
    this.$('h1').addClass('hidden');
    this.$('#edit').removeClass()
                   .focus()
                   .val(this.model.get('title'));
  },

  saveOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('#edit').val().trim() });
      this.render();
    }
  },

  showAdd: function(event) {
    event.preventDefault();

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
