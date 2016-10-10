var ListsView = Backbone.View.extend({
  el: 'main',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html('');

    app.lists.each(function(list) {
      var listView = new ListView({ model: list });

      this.$el.append(listView.$el);
    }, this);
  }
});

app.listsView = new ListsView();
