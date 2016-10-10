describe('CardView', function () {
  it('renders the correct HTML', function () {
    loadFixtures('body.html');
    this.seed();

    var model = app.lists.first().cards.first();
    var view = new CardView({ model: model });

    view.render();

    expect(view.$el.html()).toContain('<h1>Card 1 of List 1</h1>');
    expect(view.$el.html()).toContain('<p>Description of List 1 Card 1</p>');
    expect(view.$el.html()).toContain('<li>This is a comment.</li>');
  });
});
