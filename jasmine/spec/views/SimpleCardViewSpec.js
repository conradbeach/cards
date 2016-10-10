describe('SimpleCardView', function () {
  it('renders the correct HTML', function () {
    view = new SimpleCardView({ model: app.lists.first().cards.first() });

    expect(view.$el.html()).toContain('Card 1 of List 1<a href="#">Edit</a>');
  });
});
