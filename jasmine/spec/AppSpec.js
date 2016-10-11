describe('app', function () {
  beforeEach(function() {
    this.seed();
  })

  it('search function returns correct results', function () {
    var matchingModels;

    matchingModels = app.search('card');
    expect(matchingModels.length).toEqual(4);

    matchingModels = app.search('description');
    expect(matchingModels.length).toEqual(4);

    matchingModels = app.search('card 2')
    expect(matchingModels.length).toEqual(2);

    matchingModels = app.search('list 2')
    expect(matchingModels.length).toEqual(2);

    matchingModels = app.search('zounds!')
    expect(matchingModels.length).toEqual(0);
  });
});
