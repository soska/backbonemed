window._todos = [];

var $todoForm = $('#todo-form');
var $todoField = $('#todo-field');
var $todoList = $('#todo-list');

function createTodo(title){

  var todo = {
    title : title,
    done : false
  };

  _todos.push(todo);

  return todo;

}

function createListItem(todo){

  var $li = $('<li><input type="checkbox">' + todo.title + '</li>');

  $li.find('input[type=checkbox]').on('change',function(e){
    $li.toggleClass('done');

    if ($li.hasClass('done')){
      todo.done = true;
    }else{
      todo.done = false;
    }

  });

  return $li;

}

function submitFormAction(){

  todo = createTodo( $todoField.val() );

  var $li = createListItem(todo);

  $todoList.append($li);
  $todoField.val('');

}

$todoForm.on('submit', submitFormAction);
