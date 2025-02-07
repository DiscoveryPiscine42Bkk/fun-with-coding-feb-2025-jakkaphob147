$(document).ready(function() {
    function getCookies() {
        let cookies = document.cookie.split('; ');
        let todoList = cookies.find(row => row.startsWith('todos='));
        return todoList ? JSON.parse(decodeURIComponent(todoList.split('=')[1])) : [];
    }

    function setCookies(todos) {
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/;`;
    }

    function loadTodos() {
        let todos = getCookies();
        todos.reverse().forEach(todo => createTodo(todo, false));
    }

    function createTodo(text, save = true) {
        let newTodo = $("<div>").addClass("todo").text(text);
        
        newTodo.click(function() {
            if (confirm("Do you want to delete this task?")) {
                $(this).remove();
                let todos = getCookies().filter(t => t !== text);
                setCookies(todos);
            }
        });

        $("#ft_list").prepend(newTodo);

        if (save) {
            let todos = getCookies();
            todos.push(text);
            setCookies(todos);
        }
    }

    $("#newTodo").click(function() {
        let text = prompt("Enter new TO DO:");
        if (text) createTodo(text);
    });

    loadTodos();
});
