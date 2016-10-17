describe('CardView', function() {
  beforeEach(function() {
    loadFixtures('body.html');
    this.seed();

    this.model = app.lists.first().cards.first();
    this.view = new CardView({ model: this.model });

    this.$h1 = this.view.$('h1');
    this.$editCardTitleInput = this.view.$('.editCardTitleInput');
    this.$descriptionText = this.view.$('.descriptionText');
    this.$editDescriptionInput = this.view.$('.editDescriptionInput');
    this.$addCommentInput = this.view.$('.addCommentInput');
  });

  it('shows the edit title input', function() {
    expect(this.$h1).not.toHaveClass('hidden');
    expect(this.$editCardTitleInput).toHaveClass('hidden');

    this.view.showEditTitle();

    expect(this.$h1).toHaveClass('hidden');
    expect(this.$editCardTitleInput).not.toHaveClass('hidden');
    expect(this.$editCardTitleInput.val()).toEqual(this.model.get('title'));
  });

  it('closes and resets the edit title input', function() {
    this.view.showEditTitle();
    this.$editCardTitleInput.val('Card');
    this.view.closeEditTitle();

    expect(this.$editCardTitleInput).toHaveClass('hidden');
    expect(this.$editCardTitleInput.val()).toEqual('');
  });

  it('saves the card title', function() {
    this.$editCardTitleInput.val('New Title');
    this.view.saveTitleOnEnter({ which: ENTER_KEY });

    expect(this.model.get('title')).toEqual('New Title');
  });

  it('shows the edit description input', function() {
    expect(this.$descriptionText).not.toHaveClass('hidden');
    expect(this.$editDescriptionInput).toHaveClass('hidden');

    this.view.showEditDescription(new Event(null));

    expect(this.$descriptionText).toHaveClass('hidden');
    expect(this.$editDescriptionInput).not.toHaveClass('hidden');
    expect(this.$editDescriptionInput.val()).toEqual(this.model.get('description'));
  });

  it('closes and resets the edit description input', function() {
    this.view.showEditDescription(new Event(null));
    this.$editDescriptionInput.val('New Description');
    this.view.closeEditDescription();

    expect(this.$description).not.toHaveClass('hidden');
    expect(this.$editDescriptionInput).toHaveClass('hidden');
    expect(this.$editDescriptionInput.val()).toEqual('');
  });

  it('saves the description', function() {
    this.$editDescriptionInput.val('New Description');
    this.view.saveDescriptionOnEnter({ which: ENTER_KEY });

    expect(this.model.get('description')).toEqual('New Description');
  });

  it('adds a comment', function() {
    var originalCommentsLength = this.model.get('comments').length;

    this.$addCommentInput.val('New Comment');
    this.view.addCommentOnEnter({ which: ENTER_KEY });

    expect(this.model.get('comments').length).toEqual(originalCommentsLength + 1);
    expect(this.model.get('comments').pop().text).toEqual('New Comment');
  });

  it('destroys the card', function() {
    var spy = spyOn(this.model, 'destroy');

    app.showCard(this.view.model.get('id'));
    this.view.deleteCard(new Event(null));

    expect(spy).toHaveBeenCalled();
  });
});
