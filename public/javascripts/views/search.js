var SearchView = Backbone.View.extend({
  el: 'header',
  resultTemplate: app.templates.search_result,

  events: {
    'keyup .searchInput': 'search'
  },

  search: function() {
    var query = this.$('.searchInput').val();
    var matchingCards = app.search(query);
    var $ul = this.$('ul');

    $ul.html('');

    matchingCards.forEach(function(card) {
      $ul.append(this.resultTemplate(card.toJSON()));
    }, this);
  }
});

app.searchView = new SearchView();
