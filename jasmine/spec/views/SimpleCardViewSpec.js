describe('SimpleCardView', function() {
  beforeEach(function() {
    this.seed();
    this.view = new SimpleCardView({ model: app.lists.first().cards.first() });

    this.$title = this.view.$('.title');
    this.$editTitleInput = this.view.$('.editTitleInput');
  });

  it('shows the edit title input', function() {
    expect(this.$title).not.toHaveClass('hidden');
    expect(this.$editTitleInput).toHaveClass('hidden');

    this.view.showEditTitle(new Event(null));

    expect(this.$title).toHaveClass('hidden');
    expect(this.$editTitleInput).not.toHaveClass('hidden');
    expect(this.$editTitleInput.val()).toEqual('Card 1 of List 1');
  });

  it('closes and resets edit title input', function() {
    this.view.showEditTitle(new Event(null));
    this.$editTitleInput.val('New Title');

    this.view.closeEditTitle();

    expect(this.$editTitleInput).toHaveClass('hidden');
    expect(this.$editTitleInput.val()).toEqual('');
  });

  it('saves the card title', function() {
    this.$editTitleInput.val('New Title');
    this.view.saveTitleOnEnter({ which: ENTER_KEY });

    expect(this.view.model.get('title')).toEqual('New Title');
  });
});
