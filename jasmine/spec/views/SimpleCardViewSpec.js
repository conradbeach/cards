describe('SimpleCardView', function () {
  beforeEach(function() {
    this.view = new SimpleCardView({ model: app.lists.first().cards.first() });
  })

  it('renders the correct HTML', function () {
    expect(this.view.$el.html()).toContain('Card 1 of List 1<a href="#">Edit</a>');
  });

  it('triggers app.viewCard when anchor is clicked', function() {
    var cardModel = new Card();
    var view = new SimpleCardView({ model: cardModel });

    spyOn(app, 'trigger');

    view.$('a').click();

    expect(app.trigger).toHaveBeenCalledWith('viewCard', view.model);
  });
});
