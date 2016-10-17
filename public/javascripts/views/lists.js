var ListsView = Backbone.View.extend({
  el: 'main',
  newListTemplate: app.templates.new_list,

  events: {
    'click .addList': 'showAddList',
    'keypress .addListInput': 'createListOnEnter',
    'blur .addListInput': 'closeAddList'
  },

  initialize: function() {
    this.listenTo(app.lists, 'add remove', this.render);

    this.render();
  },

  render: function() {
    this.$el.html('');

    app.lists.each(function(list) {
      var listView = new ListView({ model: list });

      this.$el.append(listView.$el);
    }, this);

    this.$el.append(this.newListTemplate());
  },

  showAddList: function(event) {
    event.preventDefault();

    this.$('.addList').addClass('hidden');
    this.$('.addListInput').removeClass('hidden').focus();
  },

  closeAddList: function() {
    this.$('.addList').removeClass('hidden');
    this.$('.addListInput').val('').addClass('hidden');
  },

  createListOnEnter: function(event) {
    var title;

    if (event.which === ENTER_KEY) {
      title = this.$('.addListInput').val();
      app.lists.create({ title: title });
    }
  }
});

app.listsView = new ListsView();
