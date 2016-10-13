var SimpleCardView = Backbone.View.extend({
  model: Card,
  tagName: 'li',
  template: app.templates.simple_card,

  events: {
    'click .editTitle': 'showEditTitle',
    'keypress .editTitleInput': 'saveTitleOnEnter',
    'blur .editTitleInput': 'closeEditTitle'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  showEditTitle: function(event) {
    event.preventDefault();

    this.$('.title').addClass('hidden');
    this.$('.editTitleInput').removeClass('hidden')
                   .focus()
                   .val(this.model.get('title'));
  },

  closeEditTitle: function() {
    this.$('.title').removeClass('hidden');
    this.$('.editTitleInput').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('.editTitleInput').val().trim() });
      this.render();
    }
  }
});
