describe('app', function() {
  beforeEach(function() {
    loadFixtures('body.html');
    this.seed();
  });

  it('search function returns correct results', function() {
    var matchingModels;

    matchingModels = app.search('card');
    expect(matchingModels.length).toEqual(4);

    matchingModels = app.search('description');
    expect(matchingModels.length).toEqual(4);

    matchingModels = app.search('card 2');
    expect(matchingModels.length).toEqual(2);

    matchingModels = app.search('list 2');
    expect(matchingModels.length).toEqual(2);

    matchingModels = app.search('zounds!');
    expect(matchingModels.length).toEqual(0);
  });

  it('shows a card', function() {
    var card = app.lists.first().cards.first();
    var id = card.get('id');

    app.showCard(id);

    expect(app.currentCardView).toBeDefined();
    expect(app.currentCardView.model.get('id')).toEqual(id);
    expect($('aside')).not.toHaveClass('hidden');
    expect($('aside').html()).not.toEqual('');
  });

  it('closes a card', function() {
    var card = app.lists.first().cards.first();
    var id = card.get('id');

    app.showCard(id);
    app.closeCard();

    expect(app.currentCardView).toBeUndefined();
    expect($('aside')).toHaveClass('hidden');
  });
});
