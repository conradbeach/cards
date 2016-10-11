describe('ListView', function() {
  beforeEach(function() {
    this.seed();

    view = new ListView({ model: app.lists.first() });
  });

  it('renders the correct HTML', function() {
    expect(view.$el.html()).toContain('List 1<a href="#">Edit</a><ul>');
  });

  it('renders each card in its collection', function() {
    expect(view.$('ul li').length).toEqual(view.model.cards.length);
  });

  it('shows the add card input', function() {
    expect(view.$('#add')).toHaveClass('');
    expect(view.$('#addInput')).toHaveClass('hidden');

    view.showAddInput();

    expect(view.$('#add')).toHaveClass('hidden');
    expect(view.$('#addInput')).toHaveClass('');
  });

  it('creates a new card on enter', function() {
    expect(view.model.cards.length).toEqual(2);

    view.$('#addInput').val('New Card');

    view.createOnEnter({ which: ENTER_KEY });

    expect(view.model.cards.length).toEqual(3);
    expect(view.model.cards.last().get('title')).toEqual('New Card');
  });
});
