describe('SearchView', function() {
  beforeEach(function() {
    loadFixtures('body.html');
    this.seed();

    this.view = new SearchView({ el: 'header' });
    this.$searchInput = this.view.$('.searchInput');
  });

  it('displays the correct results from searching', function() {
    this.$searchInput.val('card');
    this.view.search();
    expect(this.view.$('ul li').length).toEqual(4);

    this.$searchInput.val('card 2');
    this.view.search();
    expect(this.view.$('ul li').length).toEqual(2);
  });
});
