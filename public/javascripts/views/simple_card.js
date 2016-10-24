var SimpleCardView = Backbone.View.extend({
  model: Card,
  tagName: 'li',
  template: app.templates.simple_card,

  events: {
    'click .editTitle': 'showEditTitle',
    'keypress .editTitleInput': 'saveTitleOnEnter',
    'blur .editTitleInput': 'closeEditTitle',

    'updateCardPosition': 'updatePosition',
    'transferCardTo': 'transferCardTo'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
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
                             .val(this.model.get('title'))
                             .focus();
  },

  closeEditTitle: function() {
    this.$('.title').removeClass('hidden');
    this.$('.editTitleInput').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    var title;

    if (event.which === ENTER_KEY) {
      title = this.$('.editTitleInput').val();

      this.model.save({ title: title });
    }
  },

  updatePosition: function() {
    this.model.set('position', this.$el.index() + 1);
    this.model.save();
  },

  transferCardTo: function(event, options) {
    options.collection.create(this.model.toJSON());
    this.model.destroy();
  }
});
