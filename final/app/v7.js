
/**
 * A collection of todo models
 */
var TodosCollection = function TodosCollection(){
  this.items = [];
}

TodosCollection.prototype = {

  add : function(attributes){
    var todo = new TodoModel(attributes);
    this.items.push(todo);
  },

  find : function(id){
    return _.find(this.items,function(item){
      return item.get('id') == id;
    });
  },

  each : function( callback ){

    var sorted = _.sortBy(this.items,function(todo){
      return !todo.get('done');
    })

    _.each(sorted, callback);

  }

}

/**
 * Todo model
 * @param {[type]} attributes [description]
 */

var TodoModel = function TodoModel( attributes ){

  this.attributes = _.extend(attributes,{
    id : new Date().getTime(),
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


/**
 * Views
 * ============
 */


/**
 * Todo List View
 */
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

/**
 * Todo item view
 * @param TodoModel todo   [description]
 * @param TodoListView parent [description]
 */
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

/**
 * Todo Form View
 */
var TodoFormView = function TodoFormView(){

  this.$el = $('#todo-form');
  this.$field = this.$el.find('#todo-field');

  this.$el.on('submit', _.bind(this.submitAction,this));

}

TodoFormView.prototype = {

  submitAction : function(e){
    e.preventDefault();
    todos.add( { title: this.$field.val() } );
    window.listView.render();
    this.$field.val('');
  }

}


// collection
window.todos = new TodosCollection();

// views
window.formView = new TodoFormView();
window.listView = new TodoListView();
