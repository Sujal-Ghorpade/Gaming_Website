let gameseq=[];
let userseq=[];
let level=0;
let started=false;
let buttons=["yellow","red","purple","Green"];
let h3=document.querySelector("h3");

document.addEventListener("keypress",()=>{
    if(started==false){
        console.log("Game Is Started");
        started=true;
        levelup();
    }
})

function levelup(){
    userseq=[]; // level up zali ki user la prt kramane btns clk krayla hve so set kele empty each new levelsathi
    level++;
    h3.innerText=`Level ${level}`;
    //random button
    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=buttons[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    console.log(gameseq);
    gameFlash(randomBtn);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
        },250)
}

let allBtns=document.querySelectorAll(".btn")
for(btn of allBtns){
   btn.addEventListener("click",btnPress);
}

function btnPress(){
    let btn=this;
    userFlash(btn);    // aapn je clk kru btn te pn flash honar yane
    let userColor= btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length-1);//user ne choice dilyavr aapn check krna mnun parameter -1 krun patvla aahe(previous checksathi) 
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
        },250)
}
function checkAns(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup(),1500) // timeout tevlynae user la preious color clk krayla vel milel
        }
    }
    else{
        h3.innerHTML=`Game Over ! Your Score Was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red"; 
        setTimeout(()=>{       // jr user ne flase valur enter keli tr body cha color red honar
            document.querySelector("body").style.backgroundColor="white"; 
        },200);
        reset();   // prt game kontihi key press krun chalu krnaysathi reset kele sgle
    }
}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}