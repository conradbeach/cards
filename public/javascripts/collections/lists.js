var Lists = Backbone.Collection.extend({
  model: List,
  localStorage: new Backbone.LocalStorage('lists-backbone'),

  initialize: function() {
    this.fetch();
  }
});

app.lists = new Lists();
