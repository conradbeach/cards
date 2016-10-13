describe('ListsView', function() {
  beforeEach(function() {
    loadFixtures('body.html');
    this.seed();

    this.view = new ListsView({ el: 'main' });

    this.$addList = this.view.$('.addList');
    this.$addListInput = this.view.$('.addListInput');
  });

  it('renders each list in the lists collection', function() {
    this.view.render();

    expect(this.view.$('section').length).toEqual(3);
  });

  it('shows the add list input', function() {
    expect(this.$addList).not.toHaveClass('hidden');
    expect(this.$addListInput).toHaveClass('hidden');

    this.view.showAddList(new Event(null));

    expect(this.$addList).toHaveClass('hidden');
    expect(this.$addListInput).not.toHaveClass('');
  });

  it('closes and resets the add list input', function() {
    this.view.showAddList(new Event(null));
    this.$addListInput.val('New List');

    this.view.closeAddList();

    expect(this.$addListInput).toHaveClass('hidden');
    expect(this.$addListInput.val()).toEqual('');
  });

  it('creates a new list', function() {
    var originalListsLength = app.lists.length;

    this.$addListInput.val('New List');
    this.view.createListOnEnter({ which: ENTER_KEY });

    expect(app.lists.length).toEqual(originalListsLength + 1);
    expect(app.lists.last().get('title')).toEqual('New List');
  });
});
