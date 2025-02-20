$(document).ready(function() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateStats();
    }

    function updateStats() {
        $('#totalTasks').text(todos.length);
        $('#completedTasks').text(todos.filter(todo => todo.completed).length);
    }

    function createTodoElement(todo, index) {
        return $('<li>')
            .addClass('todo-item')
            .addClass(todo.completed ? 'completed' : '')
            .append(
                $('<input>')
                    .attr('type', 'checkbox')
                    .prop('checked', todo.completed)
                    .on('change', function() {
                        todos[index].completed = !todos[index].completed;
                        $(this).closest('.todo-item').toggleClass('completed');
                        saveTodos();
                    })
            )
            .append(
                $('<span>')
                    .addClass('todo-text')
                    .text(todo.text)
            )
            .append(
                $('<button>')
                    .addClass('delete-btn')
                    .text('Delete')
                    .on('click', function() {
                        $(this).closest('.todo-item').slideUp(300, function() {
                            todos.splice(index, 1);
                            renderTodos();
                            saveTodos();
                        });
                    })
            );
    }

    function renderTodos() {
        const $todoList = $('#todoList').empty();
        todos.forEach((todo, index) => {
            $todoList.append(createTodoElement(todo, index));
        });
    }

    $('#addTodo').on('click', function() {
        const todoText = $('#todoInput').val().trim();
        if (todoText) {
            todos.push({
                text: todoText,
                completed: false
            });
            $('#todoInput').val('').focus();
            renderTodos();
            saveTodos();
        }
    });

    $('#todoInput').on('keypress', function(e) {
        if (e.which === 13) {
            $('#addTodo').click();
        }
    });

    renderTodos();
    updateStats();
});