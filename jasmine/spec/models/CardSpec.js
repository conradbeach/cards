describe('Card model', function() {
  it('sets the correct defaults', function() {
    var model = new Card();

    expect(model.get('title')).toEqual('');
    expect(model.get('description')).toEqual('');
    expect(model.get('comments')).toEqual([]);
  });
});
