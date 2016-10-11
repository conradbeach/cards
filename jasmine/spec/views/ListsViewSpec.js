describe('ListsView', function() {
  beforeEach(function() {
    loadFixtures('body.html');
    this.seed();

    this.view = new ListsView({ el: 'main' });
  });

  it('renders each list in the lists collection', function() {
    this.view.render();

    expect(this.view.$('section').length).toEqual(app.lists.length + 1);
  });
});
