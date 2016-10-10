describe('ListView', function() {
  beforeEach(function() {
    this.seed();

    view = new ListView({ model: app.lists.first() });
  });

  it('renders the correct HTML', function() {
    expect(view.$el.html()).toContain('List 1<a href="#">Edit</a><ul>');
  });

  it('renders each card in its collection', function() {
    expect(view.$('ul li').length).toEqual(2);
  });
});
