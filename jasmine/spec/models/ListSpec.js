describe('List model', function() {
  beforeEach(function() {
    this.model = app.lists.create();
  })

  it('sets the correct defaults', function() {
    expect(this.model.get('title')).toEqual('');
  });

  it('creates a Cards collection', function() {
    expect(this.model.cards).toBeDefined();
    expect(this.model.cards.constructor).toEqual(Cards);
  });
});
