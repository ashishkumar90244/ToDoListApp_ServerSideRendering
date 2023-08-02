//const { response } = require("express");

const btn = document.getElementById('submitTodo');
const userInputNode = document.getElementById('userInput');
const prioritySelctorNode = document.getElementById('prioritySelector');
const todoItemNode = document.getElementById('todo-item');
//let count = 0;

btn.addEventListener("click" ,function(){
    const todoContent = userInputNode.value;
    const priority = prioritySelctorNode.value;

    if(!todoContent || !priority){
        alert('Enter the content ');
        return;
    }

    const data = {
        todoContent:todoContent,
        priority:priority,
        status:'pending'

    }

    fetch("/todo",{method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    .then(function(res){
        if(res.status===200){
            //showTodoInUI(data);
            location.reload();
        }
        else if(res.status===401){
          window.location.href='/login'
          return;
        }
        userInputNode.value='';
    })
    
    .catch(function(err){
        console.log(err);
    })
})


function deleteRow(button,todo) {
    console.log(todo);
    todo =JSON.parse(todo);
    var row = button.parentNode.parentNode;
    
    fetch("/remove-data",{method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(todo),
        
    })
    .then(function(res){
        if(res.statusCode === 401)
        {
            window.location.href="/login"
        }
        res.json().then(function(todos){

            //  anchor.disabled = true;
            //  todotextNode1.style.textDecoration = "line-through";
            row.parentNode.removeChild(row);
                
            }).catch(function(err){
                console.log(err);
            })
        });

}
function updateStatus(todo,checkbox){
    console.log(todo);
    todo =JSON.parse(todo);
    var parentRow= checkbox.parentNode.parentNode;
    var firstTd = parentRow.getElementsByTagName('td')[0];

    let checked;
        if(checkbox.checked)
           checked="pending";
        else
           checked = "acceptd";
        fetch("/update-status",{method:"POST",
        
        headers:{"content-Type":"application/json"},
        body:JSON.stringify({
            todoContent:todo.todoContent,
            priority:todo.priority,
            status:checked
        })
        
    })
    .then(function(res){
        res.json().then(function(todos){

            if(firstTd.style.textDecoration === "line-through")
                firstTd.style.textDecoration = "none";
            else
                firstTd.style.textDecoration = "line-through";
            //todoTextNode.remove();
                
            }).catch(function(err){
                console.log(err);
            })
        });

}