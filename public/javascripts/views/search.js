var SearchView = Backbone.View.extend({
  el: 'header',
  resultTemplate: app.templates.search_result,

  events: {
    'keyup #search': 'search'
  },

  search: function() {
    var query = this.$('#search').val();
    var matchingCards = app.search(query);
    var $ul = this.$('ul');

    $ul.html('');

    matchingCards.forEach(function(card) {
      $ul.append(this.resultTemplate(card.toJSON()));
    }, this);
  }
});

app.searchView = new SearchView();
