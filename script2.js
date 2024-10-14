const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const locationInput = document.getElementById("location");
const dateInput = document.getElementById("date");
const importantInput = document.getElementById("important");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Enter a task");
        return;
    }
    
    const importance = importantInput.value;
    addTaskToDOM(inputBox.value, locationInput.value, dateInput.value, importance);
    inputBox.value = "";
    locationInput.value = "";
    dateInput.value = "";
}

function addTaskToDOM(task, location, date, importance) {
    let li = document.createElement("li");

    switch (importance) {
        case 'high':
            li.style.color = 'red';
            break;
        case 'medium':
            li.style.color = 'blue';
            break;
        case 'low':
            li.style.color = 'green';
            break;
        default:
            li.style.color = 'black';
    }
    
    li.innerHTML = `<strong>${task}</strong> (Location: ${location}, Due: ${date})`;

    let subtaskInput = document.createElement("input");
    subtaskInput.placeholder = "Add a subtask...";
    let addSubtaskBtn = document.createElement("button");
    addSubtaskBtn.innerText = "Subtask";

    addSubtaskBtn.onclick = function() {
        if (subtaskInput.value !== '') {
            addSubtaskToDOM(li, subtaskInput.value);
            subtaskInput.value = "";
        } else {
            alert("Add a subtask");
        }
    };

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = function() {
        let newTask = prompt("Edit task:", task);
        if (newTask) {
            li.firstChild.nodeValue = newTask;
        }
    };

    li.appendChild(subtaskInput);
    li.appendChild(addSubtaskBtn);
    li.appendChild(editBtn);
    
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
    listContainer.appendChild(li);

    span.onclick = function() {
        li.remove();
    };
}

function addSubtaskToDOM(parentLi, subtask) {
    let subtaskLi = document.createElement("li");
    subtaskLi.innerHTML = subtask;

    let editSubtaskBtn = document.createElement("button");
    editSubtaskBtn.innerText = "Edit";
    editSubtaskBtn.onclick = function() {
        let newSubtask = prompt("Edit subtask:", subtaskLi.firstChild.nodeValue);
        if (newSubtask) {
            subtaskLi.firstChild.nodeValue = newSubtask;
        }
    };
    
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    subtaskLi.appendChild(span);
    
    subtaskLi.appendChild(editSubtaskBtn);
    parentLi.appendChild(subtaskLi);
    
    span.onclick = function() {
        subtaskLi.remove();
    };
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI' && e.target.parentElement === listContainer) {
        e.target.classList.toggle('checked');
    }
}, false);
