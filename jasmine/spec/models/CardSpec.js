describe('Card model', function() {
  beforeAll(function() {
    this.collection = app.lists.first().cards;
    this.model = this.collection.create();
  });

  it('sets the correct defaults', function() {
    expect(this.model.get('title')).toEqual('');
    expect(this.model.get('description')).toEqual('');
    expect(this.model.get('comments')).toEqual([]);
  });

  it('is initialized with a position property', function() {
    expect(this.model.get('position')).toBeDefined();
    expect(this.model.get('position')).toEqual(3);
  });
});
