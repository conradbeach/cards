beforeEach(function() {
  this.seed = function() {
    app.lists.reset();

    var list1 = app.lists.create({ title: 'List 1' });
    var list2 = app.lists.create({ title: 'List 2' });

    list1.cards.reset();
    list1.cards.create({ title: 'Card 1 of List 1',
                         description: 'Description of List 1 Card 1',
                         comments: ['This is a comment.', 'This is another comment.'] });
    list1.cards.create({ title: 'Card 2 of List 1',
                        description: 'Description of List 1 Card 2',
                        comments: ['This is a comment.', 'This is another comment.'] });

    list2.cards.reset();
    list2.cards.create({ title: 'Card 1 of List 2',
                         description: 'Description of List 2 Card 1',
                         comments: ['This is a comment.', 'This is another comment.'] });
    list2.cards.create({ title: 'Card 2 of List 2',
                        description: 'Description of List 2 Card 2',
                        comments: ['This is a comment.', 'This is another comment.'] });
  };
});
