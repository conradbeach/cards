describe('CardView', function () {
  beforeEach(function() {
    loadFixtures('body.html');
    this.seed();

    this.model = app.lists.first().cards.first();
    this.view = new CardView({ model: this.model });
    this.view.render();

    this.$h1 = this.view.$('h1');
    this.$editCardTitle = this.view.$('#editCardTitle');
    this.$description = this.view.$('#description');
    this.$editDescriptionInput = this.view.$('#editDescriptionInput');
  });

  it('renders the correct HTML', function () {
    expect(this.view.$el.html()).toContain('<h1>Card 1 of List 1</h1>');
    expect(this.view.$el.html()).toContain('<p id="description">Description of List 1 Card 1</p>');
    expect(this.view.$el.html()).toContain('<li>This is a comment.</li>');
  });

  it('shows the edit title input', function() {
    expect(this.$h1).toHaveClass('');
    expect(this.$editCardTitle).toHaveClass('hidden');

    this.view.showEditTitle();

    expect(this.$h1).toHaveClass('hidden');
    expect(this.$editCardTitle).toHaveClass('');
  });

  it('closes and resets the edit title input', function() {
    this.view.showEditTitle();
    this.$editCardTitle.val('Card');
    this.$editCardTitle.blur();

    expect(this.$editCardTitle).toHaveClass('hidden');
    expect(this.$editCardTitle.val()).toEqual('');
  });

  it('shows the edit description input', function() {
    expect(this.$description).toHaveClass('');
    expect(this.$editDescriptionInput).toHaveClass('hidden');

    this.view.showEditTitle();

    expect(this.$description).toHaveClass('hidden');
    expect(this.$editDescriptionInput).toHaveClass('');
  });
});
