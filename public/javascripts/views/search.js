var SearchView = Backbone.View.extend({
  el: 'header',

  events: {
    'keypress #search': 'search'
  },

  search: function() {
    // TODO: Search and append results to ul.
    //       Create search result template.
  }
});

app.searchView = new SearchView();
