function getCookies() {
    let cookies = document.cookie.split('; ');
    let todoList = cookies.find(row => row.startsWith('todos='));
    return todoList ? JSON.parse(decodeURIComponent(todoList.split('=')[1])) : [];
}

function setCookies(todos) {
    document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/;`;
}

function loadTodos() {
    let ft_list = document.getElementById('ft_list');
    let todos = getCookies();
    todos.reverse().forEach(todo => createTodo(todo, false));
}

function createTodo(text, save = true) {
    let ft_list = document.getElementById('ft_list');
    let newTodo = document.createElement('div');
    newTodo.className = 'todo';
    newTodo.textContent = text;
    newTodo.onclick = function() {
        if (confirm('Do you want to delete this task?')) {
            newTodo.remove();
            let todos = getCookies().filter(t => t !== text);
            setCookies(todos);
        }
    };
    ft_list.insertBefore(newTodo, ft_list.firstChild);
    if (save) {
        let todos = getCookies();
        todos.push(text);
        setCookies(todos);
    }
}

function addTodo() {
    let text = prompt('Enter new TO DO:');
    if (text) createTodo(text);
}

window.onload = loadTodos;
