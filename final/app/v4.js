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

function renderList(){

  $todoList.html('');

  var sorted = _.sortBy(_todos,function(todo){
    return !todo.done;
  })

  _.each(sorted, function(todo){
    var $li = createListItem(todo);
    $todoList.prepend($li);
  });

}

function createListItem(todo){

  var $li = $('<li><input type="checkbox">' + todo.title + '</li>');
  var $checkbox = $li.find('input[type=checkbox]');

  if (todo.done){
    $checkbox.attr('checked','checked');
    $li.addClass('done');
  }

  $checkbox.on('change',function(e){
    todo.done = !todo.done;
    renderList();
  });

  return $li;

}

function submitFormAction(){
  todo = createTodo( $todoField.val() );
  renderList();
  $todoField.val('');
}

$todoForm.on('submit',function(e){
  e.preventDefault();
  submitFormAction();
});
