let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");

let msg = document.querySelector("#msg");

let turn0 = true; //playerX, //plyerY

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

 boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("Box was clicked");
        if(turn0){
            box.innerText = "O";
            turn0 = false;
            
        }else{
            box.innerText = "X";          
            turn0 = true;
        }
        box.classList.add(turn0 ? 'playerX' : 'playerO');
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
        
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
    for(let pattern of winPatterns){
 
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
        if ([...boxes].every(box => box.textContent !== '')) {
            msg.innerText = "Opps..... It's a tie!";
            msgContainer.classList.remove("hide");
            disableBoxes();
          }
    }
}

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('playerX', 'playerO', 'disabled');
      });
    msgContainer.classList.add("hide");
}



newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);

