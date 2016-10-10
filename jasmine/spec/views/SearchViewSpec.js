describe('SearchView', function () {
  xit('calls search() on input#search keypress', function (done) {
    // FIXME: This test is failing.

    loadFixtures('body.html');

    var view = new SearchView();

    spyOn(view, 'search');

    view.$('#search').trigger('keypress');

    function test() {
      expect(view.search).toHaveBeenCalled();
      done();
    }

    test();
  });
});
