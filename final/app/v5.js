// Added concepts of model and collection

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

  set : function(key, value){
    this.attributes[key] = value;
  },

  get : function(key){
    return this.attributes[key];
  },

  toggle : function(){
    this.attributes.done = !this.attributes.done;
  }

};



var $todoForm = $('#todo-form');
var $todoField = $('#todo-field');
var $todoList = $('#todo-list');


function renderList(){

  $todoList.html('');

  todos.each(function(todo){
    var $li = createListItem(todo);
    $todoList.prepend($li);
  });

}

function createListItem(todo){

  var $li = $('<li><input type="checkbox">' + todo.get('title') + '</li>');
  var $checkbox = $li.find('input[type=checkbox]');

  if (todo.get('done')){
    $checkbox.attr('checked','checked');
    $li.addClass('done');
  }

  $checkbox.on('change',function(e){
    todo.toggle();
    renderList();
  });

  return $li;

}

function submitFormAction(){
  todo = todos.add( { title: $todoField.val() } );
  renderList();
  $todoField.val('');
}

$todoForm.on('submit',function(e){
  e.preventDefault();
  submitFormAction();
});

window.todos = new TodosCollection();

