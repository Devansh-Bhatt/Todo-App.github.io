let todos;
const savedtodos = JSON.parse(localStorage.getItem('todos'));
if (Array.isArray(savedtodos)) {
    todos = savedtodos;
}
else {
    todos = [];
}


function render() {
    document.getElementById('todolist').innerHTML = '';
    todos.forEach(function (todo) {
        let element = document.createElement('div');
        element.className = 'element';
        if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.id = 'newtitle' + todo.id;
            element.appendChild(textbox);
            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.id = 'newdate' + todo.id;
            element.appendChild(datePicker);
            const updatebutton = document.createElement('button');
            updatebutton.innerText = 'Update';
            updatebutton.id = todo.id;
            updatebutton.className = 'editbutton';
            updatebutton.onclick = updatetodo;
            element.appendChild(updatebutton);
        }
        else {
            element.innerText = todo.title + ':  ' + todo.duedate;
            const editbutton = document.createElement('button');
            editbutton.innerText = 'Edit';
            editbutton.style = 'margin-left: 12px;';
            editbutton.id = todo.id;
            editbutton.className = 'editbutton';
            editbutton.onclick = editactive;
            element.appendChild(editbutton);
            const deletebutton = document.createElement('button');
            deletebutton.innerText = 'Delete';
            deletebutton.className = 'deletebutton';
            deletebutton.id = todo.id;
            deletebutton.onclick = deletetodo;
            deletebutton.style = 'margin-left: 20px;'
            element.appendChild(deletebutton);
        }

        const todolist = document.getElementById('todolist');
        todolist.appendChild(element);
    });


}
render();
function addtodo() {
    const textbox = document.getElementById('todo-title');
    title = textbox.value;
    const datePicker = document.getElementById('date-picker');
    duedate = datePicker.value;
    const id = '' + new Date().getTime();
    todos.push({
        title: title,
        duedate: duedate,
        id: id
    });

    render();
    saveTodo();
    textbox.value = '';
    datePicker.value = '';
}

function deletetodo(event) {
    const deletebutton = event.target;
    const idtodelete = deletebutton.id;
    todos = todos.filter(function (todo) {
        if (todo.id === idtodelete) {
            return false;
        }
        else {
            return true;
        }
    });
    render();
    saveTodo();
}

function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function editactive(event) {
    const editbutton = event.target;
    const idtoedit = editbutton.id;
    todos.forEach(function (todo) {
        if (todo.id === editbutton.id) {
            todo.isEditing = true;
        }
        else {
            todo.isEditing = false;
        }
    });
    render();
    saveTodo();
}

function updatetodo(event) {
    const updatebutton = event.target;
    const idtoupdate = updatebutton.id;
    const newtitle = document.getElementById('newtitle' + updatebutton.id);
    const newdate = document.getElementById('newdate' + updatebutton.id);

    todos.forEach(function (todo) {
        if (todo.id === idtoupdate) {
            todo.isEditing = false;
            if(newtitle.value!=''){
                todo.title = newtitle.value;
            }
            if(newdate.value!=''){
                todo.duedate = newdate.value;
            }
            

        }

    });
    render();
    saveTodo();
}