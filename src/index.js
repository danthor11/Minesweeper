import { Buscaminas } from "./buscaminas.js";
import   { Game } from "./game.js";

const DIFFICULT = {
    easy:{
        row:9,
        column:9,
        mines: 12
    },
    normal:{
        row:12,
        column:15,
        mines: 54
    },
    hard:{
        row:18,
        column:20,
        mines: 129
    },
    custom: {
        row:0,
        column:0,
        mines: 0
    }
}

//console.log(DIFFICULT[easy])

let initialOptions = DIFFICULT.easy, 
    test = new Game(initialOptions)

console.log(initialOptions)
const $reboot = document.querySelector("#reboot")
$reboot.oncontextmenu= function(){return false}

$reboot.addEventListener("click",e=> {
    test.endGame()
    test.new(initialOptions)
    
})

const $form = document.querySelector(".difficulty-form")

$form.addEventListener("submit",e =>{
    e.preventDefault()
    const $option = document.getElementById("difficulty")

    initialOptions = DIFFICULT[`${$option.value}`] 
    
    test.endGame()
    test.new(initialOptions)
    $form.classList.remove("show-options")
    $form.parentNode.style.opacity=0
    $form.parentNode.style.zIndex=-10
})


$form.addEventListener("change",e =>{
    e.preventDefault()
    const $customOption = document.getElementById("custom")
    
    if(e.target.value!=="custom" && e.target.id==="difficulty"){
        console.log(e.target.value)
        $customOption.innerHTML=""
    }
    else{

        if(e.target.value==="custom"){
            $customOption.innerHTML=`
                <div>
                    <label for="row">Filas:</label>
                    <input type="number" name="row" id="row" min="6" max="25">
                    <br>
                    <label for="column">Columnas:</label>
                    <input type="number" name="column" id="column" min="6" max="25">
                    <br>
                    <label for="mines">Minas:</label>
                    <input type="number" name="mines" id="mines" min="6" max="25">
                </div>
            `
            

        }
        else{
            switch(e.target.name){
                case "row":
                    DIFFICULT.custom.row=e.target.value
                    break

                case "column":
                    DIFFICULT.custom.column=e.target.value
                    break

                case "mines":
                    DIFFICULT.custom.mines=e.target.value
                    break
            }
        }
    }
    
    console.log("cambio")

        
    
    
})


const $configBtn = document.querySelector(".setting-btn")


$configBtn.addEventListener("click",e=>{
    console.log("click")
    console.log($form.parentNode)
    $form.parentNode.style.opacity=1
    $form.parentNode.style.zIndex=100

})