// this just works
$(function(){

  $('#todo-form').on('submit',function(e){

    e.preventDefault();

    var newTodo = $('#todo-field').val();
    var $li = $('<li><input type="checkbox">' + newTodo + '</li>');

    $li.find('input[type=checkbox]').on('change',function(e){
      $li.toggleClass('done');
    });

    $('#todo-list').append($li);
    $('#todo-field').val('');

  });

});
