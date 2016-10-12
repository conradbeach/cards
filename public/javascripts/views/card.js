var CardView = Backbone.View.extend({
  el: 'aside',
  template: app.templates.card,

  events: {
    'click h1': 'showEditTitle',
    'blur .editCardTitle': 'closeEditTitle',
    'keypress .editCardTitle': 'saveTitleOnEnter',

    'click .editDescription': 'showEditDescription',
    'blur .editDescriptionInput': 'closeEditDescription',
    'keypress .editDescriptionInput': 'saveDescriptionOnEnter',

    'keypress .addComment': 'addCommentOnEnter',

    'click .editComment': 'showEditComment',
    'blur .editCommentInput': 'closeEditComment',
    'keypress .editCommentInput': 'saveCommentOnEnter',

    'click .deleteComment': 'deleteComment'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },

  showEditTitle: function() {
    this.$('h1').addClass('hidden');
    this.$('.editCardTitle').removeClass('hidden')
                            .val(this.model.get('title'))
                            .focus();
  },

  closeEditTitle: function() {
    this.$('h1').removeClass('hidden');
    this.$('.editCardTitle').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('.editCardTitle').val().trim() });
    }
  },

  showEditDescription: function(event) {
    event.preventDefault();

    this.$('.description').addClass('hidden');
    this.$('.editDescriptionInput').removeClass('hidden')
                                   .val(this.model.get('description'))
                                   .focus();
  },

  closeEditDescription: function() {
    this.$('.description').removeClass('hidden');
    this.$('.editDescriptionInput').val('').addClass('hidden');
  },

  saveDescriptionOnEnter: function(event) {
    var description;

    if (event.which === ENTER_KEY) {
      description = this.$('.editDescriptionInput').val().trim();

      this.model.save({ description: description });
    }
  },

  getCommentParent: function(event) {
    return $(event.target).parents('li');
  },

  addCommentOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      var comments = this.model.get('comments');
      var comment = { date: new Date(), text: this.$('.addComment').val().trim() };

      comments.push(comment);

      this.model.save({ comments: comments });
    }
  },

  showEditComment: function(event) {
    event.preventDefault();

    var $parentLi = this.getCommentParent(event);
    var index = $parentLi.data('index');

    $parentLi.find('.comment').addClass('hidden');
    $parentLi.find('.editCommentInput').removeClass('hidden')
                          .val(this.model.get('comments')[index].text)
                          .focus();
  },

  closeEditComment: function(event) {
    var $parentLi = this.getCommentParent(event);

    $parentLi.find('.comment').removeClass('hidden');
    $parentLi.find('.editCommentInput').addClass('hidden').val('');
  },

  saveCommentOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      var $parentLi = this.getCommentParent(event);
      var text = $parentLi.find('.editCommentInput').val();
      var index = $parentLi.data('index');

      var comments = this.model.get('comments');
      var comment = comments[index];

      comment.text = text;

      this.model.save();
      this.model.trigger('change');
    }
  },

  deleteComment: function(event) {
    event.preventDefault();

    var index = this.getCommentParent(event).data('index');
    var comments = this.model.get('comments');

    comments.splice(index, 1);

    this.model.save({ comments: comments });
    this.model.trigger('change');
  }
});
