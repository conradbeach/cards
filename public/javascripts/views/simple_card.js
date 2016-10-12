var SimpleCardView = Backbone.View.extend({
  model: Card,
  tagName: 'li',
  template: app.templates.simple_card,

  events: {
    'click': 'viewCard',
    'click a': 'showEditTitle',
    'keypress input': 'saveTitleOnEnter',
    'blur input': 'closeEditTitle'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  viewCard: function() {
    app.trigger('viewCard', this.model);
  },

  showEditTitle: function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.$('span').addClass('hidden');
    this.$('input').removeClass()
                   .focus()
                   .val(this.model.get('title'));
  },

  closeEditTitle: function() {
    this.$('span').removeClass();
    this.$('input').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('input').val().trim() });
      this.render();
    }
  }
});
