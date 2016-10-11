describe('SimpleCardView', function () {
  beforeEach(function() {
    this.view = new SimpleCardView({ model: app.lists.first().cards.first() });
  })

  it('renders the correct HTML', function () {
    expect(this.view.$el.html()).toContain('Card 1 of List 1<a href="#">Edit</a>');
  });

  it('triggers app.viewCard when view is clicked', function() {
    spyOn(app, 'trigger');

    this.view.$el.click();

    expect(app.trigger).toHaveBeenCalledWith('viewCard', app.lists.first().cards.first());
  });

  it('shows the edit title input', function () {
    expect(this.view.$('span')).toHaveClass('');
    expect(this.view.$('input')).toHaveClass('hidden');

    this.view.showEditTitle(new Event(null));

    expect(this.view.$('span')).toHaveClass('hidden');
    expect(this.view.$('input')).toHaveClass('');
    expect(this.view.$('input').val()).toEqual('Card 1 of List 1');
  });

  it('closes and resets edit title input on blur', function() {
    var $input = this.view.$('input');

    this.view.showEditTitle(new Event(null));
    $input.blur();

    expect($input).toHaveClass('hidden');
    expect($input.val()).toEqual('');
  });
});
