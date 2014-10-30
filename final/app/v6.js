var TodosCollection = function TodosCollection(){
  this.items = [];
}

TodosCollection.prototype = {

  add : function(attributes){
    var todo = new TodoModel(attributes);
    this.items.push(todo);
  },

  each : function( callback ){

    var sorted = _.sortBy(this.items,function(todo){
      return !todo.get('done');
    })

    _.each(sorted, callback);

  }

}

var TodoModel = function TodoModel( attributes ){

  this.attributes = _.extend(attributes,{
    done : false
  })

}

TodoModel.prototype = {

  set : function( key, value){
    this.attributes[key] = value;
  },

  get : function( key ){
    return this.attributes[key];
  },

  toggle : function(){
    this.attributes.done = !this.attributes.done;
  }

};

var TodoListView = function TodoListView(){

  this.$el = $('#todo-list');

};

TodoListView.prototype = {

  render : function(){

    var that = this;

    this.$el.html('');

    todos.each(function(todo){
      var itemView = new TodoListItemView(todo,that);
      that.$el.prepend(itemView.$el);
      itemView.render();
    });

  }

}

var TodoListItemView = function TodoListItemView(todo, parent){

  this.todo = todo;
  this.parent = parent;

  this.$el =  $('<li><input type="checkbox"><span></span></li>');
  this.$checkbox = this.$el.find('input[type=checkbox]');
  this.$title = this.$el.find('span');

  this.$checkbox.on('change', _.bind(this.change, this));


}

TodoListItemView.prototype = {

  render : function(){

    this.$title.html(this.todo.get('title'));

    if (this.todo.get('done')){
      this.$checkbox.attr('checked','checked');
      this.$el.addClass('done');
    }

  },

  change : function(){
    this.todo.toggle();
    this.parent.render();
  }

}


var $todoForm = $('#todo-form');
var $todoField = $('#todo-field');


function submitFormAction(){
  todo = todos.add( { title: $todoField.val() } );
  window.listView.render();
  $todoField.val('');
}

$todoForm.on('submit',function(e){
  e.preventDefault();
  submitFormAction();
});

window.todos = new TodosCollection();

window.listView = new TodoListView();
