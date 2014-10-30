var App = window.App = {};

App.Todo = Backbone.Model.extend({

  defaults : {
    title : '',
    done : false
  },

  toggle : function(){
    this.set('done',!this.get('done'));
  }

});

App.Todos = Backbone.Collection.extend({

  model : App.Todo,

  comparator : function(todo){
    return todo.get('done')
  }

});


App.ListView = Backbone.View.extend({

  el : document.getElementById('todo-list'),

  initialize : function(){
    this.collection.on('change reset add remove',_.bind(this.render,this));
  },

  render : function(){

    var that = this;
    this.$el.html('');
    this.collection.sort().each(function(todo){
      var subview = new App.ListItemView({model:todo});
      that.$el.append(subview.$el);
      subview.render();
    });
  }

});

App.ListItemView = Backbone.View.extend({

  tagName : 'li',

  events : {

    'dblclick' : 'edit',
    'change .checkbox' : 'toggle',
    'click .delete' : ' &times;'

  },

  render : function(){
    this.$el.html('<input type="checkbox" class="checkbox"><span>' + this.model.get('title') + '</span><a href="#" class="delete">delete</a>');
    this.$checkbox = this.$el.find('input[type=checkbox]');
    if (this.model.get('done')){
      this.$el.addClass('done');
      this.$checkbox.attr('checked','checked');
    }

  },

  toggle : function(e){
    e.preventDefault();
    this.model.toggle();
  },

  edit : function(e){
    e.preventDefault();
    var formView = new App.ListInputView({model:this.model});
    this.$el.html('').append(formView.$el);
    formView.render();
  },

  delete : function(e){
    e.preventDefault();
    this.$el.fadeOut();
    this.model.destroy();
  }

});

App.ListInputView = Backbone.View.extend({

  tagName : 'form',

  events : {
    'submit' : 'onSubmit',
    'blut input' : 'onSubmit'
  },

  render : function(){
    this.$input = $('<input type="text">').val(this.model.get('title'));
    this.$el.append(this.$input);
  },

  onSubmit : function(e){
    e.preventDefault();
    this.model.set('title',this.$input.val());
  }

});

App.FormView = Backbone.View.extend({

  el : document.getElementById('todo-form'),

  events : {
    'submit' : 'onSubmit'
  },

  initialize : function(){
    this.$field = this.$el.find('#todo-field');
  },

  onSubmit : function(e){
    e.preventDefault();

    this.collection.add({
      title : this.$field.val()
    });

    this.$field.val('');

  }

});

App.CounterView = Backbone.View.extend({

  el : document.getElementById('todo-counter'),

  initialize : function(){
    this.collection.on('change reset add remove',_.bind(this.render,this));
    this.render();
  },

  render : function(){

    var count = this.collection.length;
    var done = this.collection.where({done:true}).length;

    this.$el.html('(' + done + '/' + count + ')');

  }

});

var todos = new App.Todos();

new App.FormView({collection:todos});
new App.ListView({collection:todos});
new App.CounterView({collection:todos});
