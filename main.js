// global 
var ull= document.querySelector("ul");
document.addEventListener("DOMContentLoaded", getTodos);

function enter() {
    var key = window.event.keyCode;
    // If the user has pressed enter
    if (key === 13) {
        var container= document.getElementById("container");
        
        var val= document.getElementById("text").value;
        document.getElementById("text").value= null;
        
        // creatng element
        saveLocalTodos(val, false);
        var ul= document.getElementById("ull");
        var li= document.createElement('li');
        var input= document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', val);
        input.disabled= true;
        var actions= document.createElement('div');
        actions.setAttribute('class', 'actions');
        var check= document.createElement('input');
        check.className= "checked";
        check.setAttribute('type', 'checkbox');
        var edit= document.createElement('input');
        edit.className='edit';
        edit.setAttribute('type', 'button');
        edit.setAttribute('value', 'E');
        var del= document.createElement('input');
        del.className= 'delete';
        del.setAttribute('type', 'button');
        del.setAttribute('value', 'X');
        // append
        ul.appendChild(li);
        li.appendChild(input);
        li.appendChild(actions);
        actions.appendChild(check);
        actions.appendChild(edit);
        actions.appendChild(del);
    }

}

ull.addEventListener('click', check);




// check element
function check(e)
{

    if(e.target.classList.contains('checked'))
    {
        var val= e.target.parentElement.parentElement.children[0].value;
        var item= e.target.parentElement.parentElement;
        var items= document.querySelectorAll("ul li")
        var i;
        // console.log(items);
        for(i=0 ; i< items.length; i++)
        {
            
            if(item== items[i])
            {
                // console.log(i);
                break;
            }
        }
        // console.log(items.indexOf(e.target));
        if(e.target.checked === true)
        {
            
            e.target.parentElement.previousElementSibling.className= 'toggle';
            checkedd(true,i);
        }
        else{
            e.target.parentElement.previousElementSibling.classList.remove('toggle');
            checkedd(false, i);
        }
    }


    if(e.target.classList.contains('delete'))
    {
        var item= e.target.parentElement.parentElement;
        var par= item.parentElement;
        var items= document.querySelectorAll("ul li")
        var i;
        // console.log(items);
        for(i=0 ; i< items.length; i++)
        {
            
            if(item== items[i])
            {
                
                par.removeChild(item);
                removeTodo(i);
                break;
            }
        }
    }


if(e.target.classList.contains('edit'))
{
    var item= e.target.parentElement.parentElement;
        var items= document.querySelectorAll("ul li")
        var i;
        item.children[0].style.border = "1px solid black";
        
        // console.log(items);
        for(i=0 ; i< items.length; i++)
        {
            if(item== items[i])
            {   
                var elt =item.children[0];
                elt.disabled= false;
                elt.onblur = function() {
                    var value= elt.value;
                    elt.classList.remove('toggle');
                    localValue(value,i);
                    // var pa= document.body.appendChild('p')
                    
                    elt.disabled= true;
                    if(value== '')
                    {
                        item.parentElement.removeChild(item);
                        removeTodo(i);
                    }
                    item.children[0].style.border = "unset";

                }



                break;
            }
        }
}

}




// save to local

function saveLocalTodos(val, check)
{
    let todos;
    if(localStorage.getItem('todos')== null)
    {
        todos =[];
    }
    else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    
    var obj= 
    {
        value: val,
        checked: check
    };
    todos.push(obj);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// checked

function checkedd(check, i)
{
    let todos= JSON.parse(localStorage.getItem('todos'));
    
    todos[i].checked= check;
    localStorage.setItem('todos', JSON.stringify(todos));
}

// get todos

function getTodos()
{
    var todos;
    if(localStorage.getItem('todos')== null)
    {
        todos =[];
    }
    else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        


        var ul= document.getElementById("ull");
        var li= document.createElement('li');
        var input= document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', todo.value);
        
        if(todo.checked== true)
        {
            input.className= "toggle";
        }
        else 
        {
            input.classList.remove('toggle');
        }
        input.disabled= true;
        var actions= document.createElement('div');
        actions.setAttribute('class', 'actions');
        var check= document.createElement('input');
        check.className= "checked";
        check.setAttribute('type', 'checkbox');
        var edit= document.createElement('input');
        edit.className='edit';
        edit.setAttribute('type', 'button');
        edit.setAttribute('value', 'E');
        var del= document.createElement('input');
        del.className= 'delete';
        del.setAttribute('type', 'button');
        del.setAttribute('value', 'X');
        // append
        ul.appendChild(li);
        li.appendChild(input);
        li.appendChild(actions);
        actions.appendChild(check);
        actions.appendChild(edit);
        actions.appendChild(del);



    });
}



// remove

function removeTodo(i)
{

    let todos= JSON.parse(localStorage.getItem('todos'));

    todos.splice(i, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    
}

// edit value

function localValue(value, i)
{
    let todos= JSON.parse(localStorage.getItem('todos'));
    todos[i].value = value;
    todos[i].checked=false;
    localStorage.setItem('todos', JSON.stringify(todos));
}