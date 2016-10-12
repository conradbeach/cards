var CardView = Backbone.View.extend({
  el: 'aside',
  template: app.templates.card,

  events: {
    'click h1': 'showEditTitle',
    'blur #editCardTitle': 'closeEditTitle',
    'keypress #editCardTitle': 'saveTitleOnEnter',

    'click #editDescription': 'showEditDescription',
    'blur #editDescriptionInput': 'closeEditDescription',
    'keypress #editDescriptionInput': 'saveDescriptionOnEnter'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  showEditTitle: function() {
    this.$('h1').addClass('hidden');
    this.$('#editCardTitle').removeClass()
                            .val(this.model.get('title'))
                            .focus();
  },

  closeEditTitle: function() {
    this.$('h1').removeClass();
    this.$('#editCardTitle').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('#editCardTitle').val().trim() });
      this.render();
    }
  },

  showEditDescription: function(event) {
    event.preventDefault();

    this.$('#description').addClass('hidden');
    this.$('#editDescriptionInput').removeClass()
                                   .val(this.model.get('description'))
                                   .focus();
  },

  closeEditDescription: function() {
    this.$('#description').removeClass();
    this.$('#editDescriptionInput').val('').addClass('hidden');
  },

  saveDescriptionOnEnter: function(event) {
    var description;

    if(event.which === ENTER_KEY) {
      description = this.$('#editDescriptionInput').val().trim();

      this.model. save({ description: description });
      this.render();
    }
  }
});
