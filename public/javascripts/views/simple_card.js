var SimpleCardView = Backbone.View.extend({
  model: Card,
  tagName: 'li',
  template: app.templates.simple_card,

  events: {
    'click': 'viewCard',
    'click a': 'showEdit',
    'keypress input': 'saveOnEnter'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  viewCard: function() {
    app.trigger('viewCard', this.model);
  },

  showEdit: function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.$('span').addClass('hidden');
    this.$('input').removeClass()
                   .focus()
                   .val(this.model.get('title'));
  },

  saveOnEnter: function(event) {
    console.log('saveOnEnter called!');

    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('input').val().trim() });
      this.render();
    }
  }
});
