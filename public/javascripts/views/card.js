var CardView = Backbone.View.extend({
  template: app.templates.card,
  className: 'container',

  events: {
    'click .closeCard': 'closeCard',

    'click .deleteCard': 'askDeleteCard',
    'click .cancelDeleteCard': 'cancelDeleteCard',
    'click .confirmDeleteCard': 'deleteCard',

    'click h1': 'showEditTitle',
    'blur .editCardTitleInput': 'closeEditTitle',
    'keypress .editCardTitleInput': 'saveTitleOnEnter',

    'click .editDescription': 'showEditDescription',
    'blur .editDescriptionInput': 'closeEditDescription',
    'keypress .editDescriptionInput': 'saveDescriptionOnEnter',

    'keypress .addCommentInput': 'addCommentOnEnter',

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

  closeCard: function() {
    app.closeCard();
  },

  toggleDeleteButtons: function() {
    this.$('.cancelDeleteCard').slideToggle(150);
    this.$('.confirmDeleteCard').slideToggle(150);
  },

  askDeleteCard: function(event) {
    event.preventDefault();
    this.toggleDeleteButtons();
  },

  cancelDeleteCard: function(event) {
    event.preventDefault();
    this.toggleDeleteButtons();
  },

  deleteCard: function() {
    this.model.destroy();
    this.closeCard();
  },

  showEditTitle: function() {
    this.$('h1').addClass('hidden');
    this.$('.editCardTitleInput').removeClass('hidden')
                            .val(this.model.get('title'))
                            .focus();
  },

  closeEditTitle: function() {
    this.$('h1').removeClass('hidden');
    this.$('.editCardTitleInput').val('').addClass('hidden');
  },

  saveTitleOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.model.save({ title: this.$('.editCardTitleInput').val().trim() });
    }
  },

  showEditDescription: function(event) {
    event.preventDefault();

    this.$('.descriptionText').addClass('hidden');
    this.$('.editDescriptionInput').removeClass('hidden')
                                   .val(this.model.get('description'))
                                   .focus();
  },

  closeEditDescription: function() {
    this.$('.descriptionText').removeClass('hidden');
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
      var comment = { date: new Date(), text: this.$('.addCommentInput').val().trim() };

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
