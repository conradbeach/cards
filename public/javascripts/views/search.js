var SearchView = Backbone.View.extend({
  el: 'header',
  resultTemplate: app.templates.search_result,

  events: {
    'keyup .searchInput': 'search',
    'blur .searchInput': 'closeSearchResults'
  },

  search: function() {
    var query = this.$('.searchInput').val();
    var matchingCards = app.search(query);
    var $ul = this.$('ul');

    $ul.html('');

    matchingCards.forEach(function(card) {
      $ul.append(this.resultTemplate(card.toJSON()));
    }, this);
  },

  closeSearchResults: function() {
    $ul = this.$('ul');

    function close() {
      $ul.html('');
    }

    setTimeout(close, 100);
  }
});

app.searchView = new SearchView();
