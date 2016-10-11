var ListsView = Backbone.View.extend({
  el: 'main',
  newListTemplate: app.templates.new_list,

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html('');

    app.lists.each(function(list) {
      var listView = new ListView({ model: list });

      this.$el.append(listView.$el);
    }, this);

    this.$el.append(this.newListTemplate());
  }
});

app.listsView = new ListsView();
