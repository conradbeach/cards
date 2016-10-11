describe('ListView', function() {
  beforeEach(function() {
    this.seed();

    this.view = new ListView({ model: app.lists.first() });

    this.$h1 = this.view.$('h1');
    this.$editListTitle = this.view.$('#editListTitle');
    this.$addCard = this.view.$('#addCard');
    this.$addCardInput = this.view.$('#addCardInput');
  });

  it('renders the correct HTML', function() {
    var html = this.view.$el.html();

    expect(html).toContain('<h1>List 1<a href="#" id="deleteList">Delete</a></h1>');
    expect(html).toContain('<input class="hidden" id="editListTitle">');
    expect(html).toContain('<ul>');
  });

  it('renders each card in its collection', function() {
    expect(this.view.$('ul li').length).toEqual(this.view.model.cards.length);
  });

  it('shows the add card input', function() {
    expect(this.$addCard).toHaveClass('');
    expect(this.$addCardInput).toHaveClass('hidden');

    this.view.showAddCard(new Event(null));

    expect(this.$addCard).toHaveClass('hidden');
    expect(this.$addCardInput).toHaveClass('');
  });

  it('closes and resets add card input', function () {
    this.view.showAddCard(new Event(null));
    this.$addCardInput.val('Card');
    this.$addCardInput.blur();

    expect(this.$addCardInput).toHaveClass('hidden');
    expect(this.$addCardInput.val()).toEqual('');
  });

  it('creates a new card on enter', function() {
    expect(this.view.model.cards.length).toEqual(2);

    this.$addCardInput.val('New Card');

    this.view.createCardOnEnter({ which: ENTER_KEY });

    expect(this.view.model.cards.length).toEqual(3);
    expect(this.view.model.cards.last().get('title')).toEqual('New Card');
  });

  it('shows the edit title input', function() {
    expect(this.$h1).toHaveClass('');
    expect(this.$editListTitle).toHaveClass('hidden');

    this.view.showEditTitle();

    expect(this.$h1).toHaveClass('hidden');
    expect(this.$editListTitle).toHaveClass('');
    expect(this.$editListTitle.val()).toEqual('List 1');
  });

  it('closes and resets edit title input on blur', function () {
    this.view.showEditTitle();
    this.$editListTitle.blur();

    expect(this.$editListTitle).toHaveClass('hidden');
    expect(this.$editListTitle.val()).toEqual('');
  });
});
