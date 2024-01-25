let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let nbrT = document.querySelector(".Total");
let btn = document.querySelector(".btn");
let nbr = document.querySelector(".nbr")



isShow = true ;
function hiden(){
    if(isShow){
        tasksDiv.style.display='none';
        isShow = false ;
    }
    else{
        tasksDiv.style.display='block';
        isShow = true ;
    }
}

let tabDeTaches =  [] ;
let btns = document.getElementById('btn');


btns.classList.add('filters-display-none');

if(localStorage.getItem("tasks")?.length){
    tabDeTaches = JSON.parse(localStorage.getItem("tasks"));
    btns.classList.remove('filters-display');
    btns.classList.remove('filters-display-none');
    btns.classList.add('filters-display');
}

getTasksLS() ;

//ajouter taches

submit.onclick = function(){

    if(input.value !== ""){

        addTask(input.value);

        btns.classList.remove('filters-display-none');
        btns.classList.add('filters-display');

        input.value = "" ;
    }

}

tasksDiv.addEventListener("click" , (e)=>{

    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        deleteTaskById(e.target.parentElement.getAttribute("data-id"));
    }

    if(e.target.classList.contains("task")){

        basculerStatus(e.target.getAttribute("data-id"));


        e.target.classList.toggle("done");
        nbr.textContent = up() + " Task";


    }
} )

function addTask(task){

    //task model 

    let Task = {
        id : Date.now() ,
        title : task ,
        completed : false ,
    };

    //ajouter le tache

    tabDeTaches.push(Task);

    // console.log(tabDeTaches);

    addElement(tabDeTaches);

    addToLS(tabDeTaches);

    nbr.textContent = up() + " Task";


}

function addElement(tabDeTaches){

    tasksDiv.innerHTML = "" ;

    tabDeTaches.forEach((Task) => {

        //creation de main div 
        let div = document.createElement("div") ;
        div.className = "task" ;

        if(Task.completed === true){
            div.className = "Task Done" ;
        }
        div.setAttribute("data-id" , Task.id);
        div.appendChild(document.createTextNode(Task.title));

        //creation de button delete
        let span = document.createElement("span");
        span.className = "del" ;
        span.appendChild(document.createTextNode("X"));

        //ajouter le button au main div
        div.appendChild(span);

        tasksDiv.appendChild(div) ;

        activebtn();

});

}

//post 
function addToLS(tabDeTaches){
    window.localStorage.setItem("tasks" , JSON.stringify(tabDeTaches));
}
//get
function getTasksLS(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data) ;
        addElement(tasks) ;
    }
}

function deleteTaskById(taskId){

    tabDeTaches = tabDeTaches.filter((Task) => Task.id != taskId) ;
    addToLS(tabDeTaches);

    if(!tabDeTaches.length) {btns.classList.add('filters-display-none'); localStorage.clear()}

    nbr.textContent = up()

}

function basculerStatus(taskId){

    for (let i = 0; i < tabDeTaches.length; i++) {
        if (tabDeTaches[i].id == taskId) {
            tabDeTaches[i].completed == false ? (tabDeTaches[i].completed = true) : (tabDeTaches[i].completed = false);
        }
    }
    addToLS(tabDeTaches);
}

function activebtn(){

    if(tabDeTaches.length){
        btns.classList.add('.filters-display')
    }
    
}

function filterComleted(){
    
    let x =tabDeTaches.filter(t=>t.completed);
    getTasksLS();
    addElement(x);
    
}

function filterActive(){
    
    let x =tabDeTaches.filter(t=>t.completed === false);
    getTasksLS();
    addElement(x)
    
}

function ClearCompleted(){

    let y = tabDeTaches.filter(t=>t.completed === false) ;
    addElement(y);
    tabDeTaches = y
    localStorage.clear();
    localStorage.setItem("tasks",JSON.stringify(tabDeTaches));
    nbr.textContent = up() + " Task" ;

}

function up(completed){
    var x = 0;

    tabDeTaches.filter(function (tab){
        if(tab.completed === false){
            x = x+1;
        }
    })

    return x ;

}

nbr.textContent = up() + " Task";


