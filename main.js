const ToDoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.todo-button');
const ToDoList = document.querySelector('.todo-list');



const addTodo = (event) => {
    event.preventDefault();

    if (ToDoInput.value != '') {
        const date = new Date();
        let dd = date.getDate() < 10 ? 0 : '';
        let mm = date.getMinutes() < 10 ? 0 : '';
        let time = `${dd}${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours() + 1}:${mm}${date.getMinutes()}`;

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = ToDoInput.value;
        newTodo.classList.add('todo-doin');
        todoDiv.appendChild(newTodo);

        const timeTodo = document.createElement('span');
        timeTodo.innerText = time;
        timeTodo.classList.add('time');
        todoDiv.appendChild(timeTodo);

        let obj = {
            name: ToDoInput.value,
            time: time
        }

        saveLocal(obj);

        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="far fa-clock"></i>';
        checkBtn.classList.add('checked');
        todoDiv.appendChild(checkBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.classList.add('delete');
        todoDiv.appendChild(deleteBtn);

        ToDoList.appendChild(todoDiv);



        ToDoInput.value = '';
    }


}



const DeleteToDo = (event) => {
    const item = event.target;
    if (item.classList[0] === 'delete') {
        const todo = item.parentElement;
        removeLocal(todo);
        todo.remove();
    }

    if (item.classList[0] === 'checked') {
        const todo = item.parentElement;
        todo.children[1].classList.toggle('active');
    }

}


const saveLocal = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getLocal = () => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo.name;
        newTodo.classList.add('todo-doin');
        todoDiv.appendChild(newTodo);

        const timeTodo = document.createElement('span');
        timeTodo.innerText = todo.time;
        timeTodo.classList.add('time');
        todoDiv.appendChild(timeTodo);

        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="far fa-clock"></i>';
        checkBtn.classList.add('checked');
        todoDiv.appendChild(checkBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.classList.add('delete');
        todoDiv.appendChild(deleteBtn);

        ToDoList.appendChild(todoDiv);
    });
}

const removeLocal = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(todos.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

addBtn.addEventListener('click', addTodo);
ToDoList.addEventListener('click', DeleteToDo);
document.addEventListener('DOMContentLoaded', getLocal);