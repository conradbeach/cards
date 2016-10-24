var ListsView = Backbone.View.extend({
  el: 'main',
  newListTemplate: app.templates.new_list,

  events: {
    'click .addList': 'showAddList',
    'blur .addListInput': 'closeAddList',
    'keypress .addListInput': 'createListOnEnter',

    'sortupdate': 'updateListPositions'
  },

  initialize: function() {
    this.listenTo(app.lists, 'add remove', this.render);

    this.$el.sortable({
      items: 'section:not(.noSort)'
    }).disableSelection();

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
  },

  updateListPositions: function() {
    this.$('section').each(function(index, list) {
      $(list).trigger('updateListPosition');
    });
  }
});

app.listsView = new ListsView();
