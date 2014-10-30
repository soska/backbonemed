// let's cache some functions

$(function(){

  window._todos = [];

  var $todoForm  = $('#todo-form');
  var $todoField = $('#todo-field');
  var $todoList  = $('#todo-list');

  $todoForm.on('submit',function(e){

    e.preventDefault();

    var newTodo = {
      title : $todoField.val(),
      done : false
    };

    _todos.push(newTodo);

    var $li = $('<li><input type="checkbox">' + newTodo.title + '</li>');

    $li.find('input[type=checkbox]').on('change',function(e){
      $li.toggleClass('done');

      if ($li.hasClass('done')){
        newTodo.done = true;
      }else{
        newTodo.done = false;
      }

    });

    $todoList.append($li);
    $todoField.val('');

  });

});
