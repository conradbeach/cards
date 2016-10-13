describe('ListView', function() {
  beforeEach(function() {
    this.seed();

    this.view = new ListView({ model: app.lists.first() });

    this.$h1 = this.view.$('h1');
    this.$editListTitleInput = this.view.$('.editListTitleInput');
    this.$addCard = this.view.$('.addCard');
    this.$addCardInput = this.view.$('.addCardInput');
  });

  it('renders each card in its collection', function() {
    expect(this.view.$('ul li').length).toEqual(this.view.model.cards.length);
  });

  it('shows the edit title input', function() {
    expect(this.$h1).not.toHaveClass('hidden');
    expect(this.$editListTitleInput).toHaveClass('hidden');

    this.view.showEditTitle();

    expect(this.$h1).toHaveClass('hidden');
    expect(this.$editListTitleInput).not.toHaveClass('hidden');
    expect(this.$editListTitleInput.val()).toEqual('List 1');
  });

  it('closes and resets edit title input', function() {
    this.view.showEditTitle();
    this.$editListTitleInput.val('New Title');
    this.view.closeEditTitle();

    expect(this.$editListTitleInput).toHaveClass('hidden');
    expect(this.$editListTitleInput.val()).toEqual('');
  });

  it('saves the list title', function() {
    this.$editListTitleInput.val('New Title');
    this.view.saveTitleOnEnter({ which: ENTER_KEY });

    expect(this.view.model.get('title')).toEqual('New Title');
  });

  it('shows the add card input', function() {
    expect(this.$addCard).not.toHaveClass('hidden');
    expect(this.$addCardInput).toHaveClass('hidden');

    this.view.showAddCard(new Event(null));

    expect(this.$addCard).toHaveClass('hidden');
    expect(this.$addCardInput).not.toHaveClass('hidden');
  });

  it('closes and resets add card input', function() {
    this.view.showAddCard(new Event(null));
    this.$addCardInput.val('Card');
    this.view.closeAddCard();

    expect(this.$addCardInput).toHaveClass('hidden');
    expect(this.$addCardInput.val()).toEqual('');
  });

  it('creates a new card', function() {
    var originalCardLength = this.view.model.cards.length;

    this.$addCardInput.val('New Card');
    this.view.createCardOnEnter({ which: ENTER_KEY });

    expect(this.view.model.cards.length).toEqual(originalCardLength + 1);
    expect(this.view.model.cards.last().get('title')).toEqual('New Card');
  });
});
