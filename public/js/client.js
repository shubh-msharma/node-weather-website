console.log("clients js loaded");




let div = document.getElementById('list');


document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    let loc = document.querySelector('input').value;
    if(loc.length<2){
        div.classList.add("col-5");
        div.innerText = "try correct location";
    }else{
        div.innerHTML = `<div id="fountainG"><div id="fountainG_1" class="fountainG"></div>
        <div id="fountainG_2" class="fountainG"></div>
        <div id="fountainG_3" class="fountainG"></div>
        <div id="fountainG_4" class="fountainG"></div>
        <div id="fountainG_5" class="fountainG"></div>
        <div id="fountainG_6" class="fountainG"></div>
        <div id="fountainG_7" class="fountainG"></div>
        <div id="fountainG_8" class="fountainG"></div>
    </div>`
        fetch("http://localhost:3000/weather?address="+encodeURIComponent(loc))
    .then(res=>{
        res.json()
        .then(data=>{
            renderData(data);
        })
    },err=>{
        div.classList.add("col-5");
        div.innerText = "try another location";
    })
    }
    
})

function renderData(data){
    div.classList.add("col-5");
        div.innerHTML = "";
        let ul  = document.createElement('ul');
        let listItem = []
        for(let key in data){
            let li = document.createElement('li');
            li.append(`${key}: ${data[key]}`);
            li.classList.add('list-group-item');
            listItem.push(li);          
        }
        listItem.reverse();
        ul.classList.add('list-group');
        ul.append(...listItem);
        div.append(ul);
        

}