describe('SearchView', function() {
  beforeEach(function() {
    loadFixtures('body.html');
    this.seed();

    this.view = new SearchView({ el: 'header' });
  });

  it('displays the correct results from searching', function() {
    this.view.$('#search').val('card');
    this.view.search();
    expect(this.view.$('ul li').length).toEqual(4);

    this.view.$('#search').val('card 2');
    this.view.search();
    expect(this.view.$('ul li').length).toEqual(2);
  });
});
