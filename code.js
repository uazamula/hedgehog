'use strict';
window.onerror = function(message, url, line) {
    alert(`Error: ${message}\n${url}: ${line}`);
};
init();
function init() {
}

const FW = "Вперед";
const LEFT = "Повернути вліво";
const RIGHT = "Повернути вправо";
const REPEAT = "Повторити";
const ENDBLOCK = "Кінець блоку";
const settings= [
  {'solution':[FW,FW,RIGHT,FW],
  'squares': [4,5,6,9],
  'startAt': 4,
   'degrees':'0deg'},
  {'solution':[REPEAT+' 2',FW,RIGHT,FW,LEFT,ENDBLOCK],
  'squares': [1,2,5,6,9],
  'startAt': 5,
  'degrees':'0deg'}
];

let commands=[[],[]];
let levelIndex = 0;
let isBlock=0;
console.log(localStorage.commands+'Storage');

var divCode = document.querySelector('#codeList');
const divWrapper =document.querySelector('#wrapper');
const divMenu =document.querySelector('#menu');

var btn;

// getData();
function getData(){
// if(window.location.pathname.split("/").pop()==='game.html'){
  if (typeof localStorage.commands !== 'undefined'){
  //TODO save results for multiple levels
  commands = JSON.parse(localStorage.commands);
  console.log(commands)
  onReopen();
  // }
}}

console.log('Storage =' + commands)

function onReopen(){
  //insert creation of buttons(code) when browser is opening
    
  //TODO add levelIndex to commands

  commands[levelIndex].forEach(command=>{
    insertCommand(command);
    btn.textContent=command;
    
  })
  
}

function insertCommand(command){ 
    btn = document.createElement('button')
    if (command===ENDBLOCK){
      if (isBlock>0)
      isBlock-=1;
    }
    console.log('isBlock='+isBlock)

   // if(isBlock)
    btn.style.marginLeft=5+isBlock*20+'px'

    var br = document.createElement('br')
    divCode.insertAdjacentElement('beforeend',btn)
    divCode.insertAdjacentElement('beforeend',br)
    
    if (command.includes(REPEAT)){
      isBlock+=1;
      console.log('isBlock='+isBlock)
    }
}    

function onBtnFw(e, text=REPEAT+' '){
    const command=text+e.target.innerText
    insertCommand(command);
    btn.textContent=command;
    commands[levelIndex].push(btn.textContent);
    localStorage.commands = JSON.stringify(commands);
    
    console.log(commands)
    console.log(levelIndex)
}

document.querySelectorAll('.repeat').forEach(a=>{
  a.onclick = onBtnFw;
})

document.querySelectorAll('.levelBtn').forEach((e,i)=>{
  e.onclick=function(){
    divWrapper.style.display = 'block';
    divMenu.style.display = 'none';
    let grid = document.querySelectorAll('.grid-item');
    //TODO startposition(num of square)
    levelIndex=i;
    isBlock=false;
    getData();
    grid.forEach((e,i)=>{if (settings[levelIndex]['squares'].includes(i+1)){e.classList.add('grass')}});
    document.querySelector('#level').innerHTML = 'Level'+(levelIndex+1)
  }
})


function menu(){
  // document.querySelector('#btnLeft').textContent='kghkg'
  // console.log('khh')va
 
  divWrapper.style.display = 'none'
  divMenu.style.display = 'block'

  let grid = document.querySelectorAll('.grass');
  grid.forEach((e,i)=>{e.classList.remove('grass')});

  var list =  document.querySelector('#codeList');
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  console.log(commands)

}

function deleteCommand(){
  //TODO
  const command = commands[levelIndex].pop();
  var commandList =  document.querySelector('#codeList');
  //remove button and br elements
  if (commandList.hasChildNodes()){
  commandList.removeChild(commandList.lastChild);}
  if (commandList.hasChildNodes()){
  commandList.removeChild(commandList.lastChild);}
  //TODO
  localStorage.commands = JSON.stringify(commands)

  if (command===ENDBLOCK){
    isBlock+=1;
  }  
  if (command.includes(REPEAT)){
        if (isBlock>0)
          isBlock-=1;
  }
          
}

function clearAll(){
  /* видаляємо html elements and код */
  var list =  document.querySelector('#codeList');
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  //TODO
  commands[levelIndex]=[]
  localStorage.commands = JSON.stringify(commands)          
  isBlock=0
}



function myMove() {
    let id = null;
    var hedgehog = document.querySelector("#hh");   
    let pos_x = hedgehog.getBoundingClientRect().left;
    let pos_y = hedgehog.getBoundingClientRect().top;
    let save_pos_x = pos_x
    let save_pos_y = pos_y
    console.log(hedgehog, pos_x, hedgehog.getAttribute('width') )
    var degree=0
    var index=0;
    const wait_seconds=1
    var wait=0;
    let loop = [1,1];
    let startBlockIndex=[-1,-1];
    let countRepeat=0;
    let countEndBlock=0;
    let maxLoopLevel=0;

    const delay = 400

    clearInterval(id);
    id = setInterval(frame, delay); 
    function frame() {
      //TODO
      let command = commands[levelIndex][index];
      if (commands[levelIndex].length===index) {      
        if (wait>=wait_seconds){
          hedgehog.style.left = save_pos_x+"px";
          hedgehog.style.top = save_pos_y+"px";
          // commands=[];
          hedgehog.style.transform = 'rotate(0deg)';
          //TODO comparation commands.forEach(i,e=>{ solution[i]===e return });
          var message;
          if (JSON.stringify(settings[levelIndex]['solution'])===JSON.stringify(commands[levelIndex])){
            message = 'Congratulations! \u{1F603}'
          }
          else{
            message = "Improve your code. \u{1F928} "
          }
          alert(message);
          clearInterval(id);
        }
        else{

          wait+=delay/1000;
          console.log(wait+' wait')

        }
          console.log( hedgehog.getBoundingClientRect().left   );

       
      } else {
        //TODO
        if(command===LEFT){
          degree-=90
        } 
        //TODO
        if(command===RIGHT) {
          degree+=90
        }        
        hedgehog.style.transform = 'rotate('+degree+'deg)';
        if (degree**2===360**2){
          degree=0
        }
        console.log('size: '+ hedgehog.getAttribute('width'));
        //TODO
        if (command===FW){
          pos_x+= 150 * Math.cos(degree*Math.PI/180); 
          pos_y+= 150 * Math.sin(degree*Math.PI/180); 

          hedgehog.style.left = pos_x + "px"; 
          hedgehog.style.top = pos_y + "px"; 
        }  
        if (command.includes(REPEAT)){
          //Only for numbers up to 9
          if (countRepeat===0){
            loop[0]=command.slice(-1);
            startBlockIndex[0]=index;          
            countRepeat++
          } else{
            loop[1]=command.slice(-1);
            startBlockIndex[1]=index;            
          }
            if (maxLoopLevel<2){
            maxLoopLevel++
          }
        }
        index++;
//TODO  
        if(command===ENDBLOCK){
          if ( loop[1]>1){
            loop[1]--;
            index=startBlockIndex[1]+1;
            countEndBlock=0;
          } else{
            countEndBlock++
            if(countEndBlock>=maxLoopLevel){
              if (loop[0]>1){
                loop[0]--
                index= startBlockIndex[0]+1;
              }else{
                countRepeat=0;
                maxLoopLevel=0;
              }
              countEndBlock=0;
            }

          }

        }
        
      }
    }
  }



//drop down
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}  

// document.addEventListener('DOMContentLoaded', function(){
//     document.querySelector('#btnFw')=function(){button.onclick=onBtnFw();}
// })
