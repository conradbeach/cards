var CardView = Backbone.View.extend({
  el: 'aside',
  template: app.templates.card,

  events: {
    'click h1': 'showEditTitle',
    'blur #editCardTitle': 'closeEditTitle',
    'keypress #editCardTitle': 'saveTitleOnEnter'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  showEditTitle: function() {
    this.$('h1').addClass('hidden');
    this.$('#editCardTitle').removeClass()
                            .focus()
                            .val(this.model.get('title'));
  },

  closeEditTitle: function() {
    console.log('Called closeEditTitle');
    this.$('h1').removeClass();
    this.$('#editCardTitle').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('#editCardTitle').val().trim() });
      this.render();
    }
  }
});
