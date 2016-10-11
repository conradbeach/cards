describe('ListView', function() {
  beforeEach(function() {
    this.seed();

    this.view = new ListView({ model: app.lists.first() });
  });

  it('renders the correct HTML', function() {
    expect(this.view.$el.html()).toContain('<h1>List 1</h1><input class="hidden" id="edit"><ul>');
  });

  it('renders each card in its collection', function() {
    expect(this.view.$('ul li').length).toEqual(this.view.model.cards.length);
  });

  it('shows the add card input', function() {
    var $addCardInput = this.view.$('#add')

    expect($addCardInput).toHaveClass('');
    expect(this.view.$('#addInput')).toHaveClass('hidden');

    this.view.showAddCard(new Event(null));

    expect($addCardInput).toHaveClass('hidden');
    expect(this.view.$('#addInput')).toHaveClass('');
  });

  it('closes and resets add card input', function () {
    var $addCardInput = this.view.$('#add');

    this.view.showAddCard(new Event(null));
    $addCardInput.blur();

    expect($addCardInput).toHaveClass('hidden');
    expect($addCardInput.val()).toEqual('');
  });

  it('creates a new card on enter', function() {
    expect(this.view.model.cards.length).toEqual(2);

    this.view.$('#addInput').val('New Card');

    this.view.createCardOnEnter({ which: ENTER_KEY });

    expect(this.view.model.cards.length).toEqual(3);
    expect(this.view.model.cards.last().get('title')).toEqual('New Card');
  });

  it('shows the edit title input', function() {
    expect(this.view.$('h1')).toHaveClass('');
    expect(this.view.$('#edit')).toHaveClass('hidden');

    this.view.showEditTitle();

    expect(this.view.$('h1')).toHaveClass('hidden');
    expect(this.view.$('#edit')).toHaveClass('');
    expect(this.view.$('#edit').val()).toEqual('List 1');
  });

  it('closes and resets edit title input on blur', function () {
    var $editInput = this.view.$('#edit');

    this.view.showEditTitle();
    $editInput.blur();

    expect($editInput).toHaveClass('hidden');
    expect($editInput.val()).toEqual('');
  });
});
