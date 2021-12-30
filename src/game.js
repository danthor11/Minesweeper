import { Buscaminas } from "./buscaminas.js";



export const Game= function({row,column,mines}) {
    this.new({row,column,mines})
}

Game.prototype.new = function({row,column,mines}){
    
    this.flags=15
    this.isEnd=false
    this.isStart=false
    this.time = null
    this.$stage = document.getElementById("stage")
    this.$timer = document.getElementById("timer")
    this.$rebootButton = document.getElementById("reboot")
    this.$rebootButton.innerHTML="<i class='far fa-smile-beam'></i></i>"
    this.$timer.textContent="000"
    this.$flags =document.getElementById("flags")
    this.$flags.textContent="15"
    this.buscaminas = new Buscaminas(mines,row,column)
    this.createHTML()
    this.startGame()
    this.$stage.style.gridTemplateColumns = `repeat(${column},auto)`
    this.$stage.oncontextmenu= function(){return false}
}

Game.prototype.createHTML = function(){
    const $button = document.createElement("button"),
        $fragment = document.createDocumentFragment()

    this.$stage.innerHTML=""

    for(let row of this.buscaminas.board){
        row.forEach(el => {
            let {adjacentMine,row,column} = el;  
            

            $button.setAttribute("data-row",row)
            $button.setAttribute("data-column",column)
            // $button.innerHTML=adjacentMine;
           
            
            let $clone = document.importNode($button,true)
            $fragment.appendChild($clone)
        })
    }

    this.$stage.appendChild($fragment)
}

Game.prototype.render = function(){
    
    for(let row of this.buscaminas.board){
        row.forEach(el => {
            let {adjacentMine,isVisible,row,column,flag,doubt} = el
            const $cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`)
            if (isVisible===true){
                $cell.textContent=adjacentMine
                $cell.classList.add("is-active")
                switch(adjacentMine){
                    case 0:
                        $cell.textContent=""
                        break
                    case 1:
                        $cell.style.color="#1947F2"
                        break
                    case 2:
                        $cell.style.color="#0B873C"
                        break
                    case 3:
                        $cell.style.color="#E02909"
                        break
                    case 4:
                        $cell.style.color="#0D0699"
                        break
                    case 5:
                        $cell.style.color="#C71CE6"
                        break
                    case 6:
                        $cell.style.color="#DD0D6F"
                        break
                    case 7:
                        $cell.style.color="#A206B1"
                        break
                    case 8:                        
                         $cell.style.color="#F00B24"
                        break
                    case 9:
                        
                        $cell.innerHTML= `<i class="fas fa-bomb"></i>`
                        //$cell.classList.add("exploted")
                        break;
                }   
            }else{
                // $cell.textContent=adjacentMine
                
            }
            if(flag){
                $cell.innerHTML=`<img src='../assets/bandera.png'  alt='flag' class="visible" data-column=${el.column}
                                    data-row=${el.row}>`
                
            }
            if(doubt){
                $cell.innerHTML=`<img src="../assets/dudoso.png" alt="doubt" data-column=${el.column}
                                    data-row=${el.row}></img>`
               
                    
            }
            if(this.buscaminas.gameOver){
                
            }

        })
    }

    /**
     *  ? Mensaje Perdedor
     */
    if(this.buscaminas.isLosed){
       
        messageEndGame("message lose","Lo siento, has perdido")
        document.getElementById("reboot").innerHTML = "<i class='far fa-frown'></i>"
        return
    }

    /**
     *  ? Mensaje Ganador
     */
    if(!this.buscaminas.countCellsRemaining()){
        messageEndGame("message win","¡Felicitaciones, has ganado!")
        this.buscaminas.endGame()
        return
    }

   
}

Game.prototype.startGame = function(){
   
    this.createEventListener()
 
}

Game.prototype.endGame = function () {
    this.isEnd=true 
    clearInterval(this.clock)
    
}




Game.prototype.chronometer = function(){ 
    this.clock = setInterval(() => {
        let time = new Date() - this.time,
        seconds=("00" + Math.floor((time % (1000*60)) /(1000))).slice(-3);
        this.$timer.innerHTML = `<p id="timer">${seconds}</p>`
    }, 1000);

    
}


function messageEndGame($class,message){
    const el = document.getElementById("message")
    el.style.opacity="1"
    el.style.zIndex="50"
    el.innerHTML=`<p class='${$class}'>${message}</p>`
    setTimeout(() => {
        el.style.opacity="0"
        el.style.zIndex="-1"
    },2000)
}


Game.prototype.writeCell = function($button, element, $fragment){
    
    let {adjacentMine,isVisible,row,column,flag,doubt} = element;  
    $button.setAttribute("data-row",row)
    $button.setAttribute("data-column",column)
    // $button.innerHTML=adjacentMine;

    if (isVisible===true){
        $button.classList.add("is-active")
        switch(adjacentMine){
            case 0:
                $button.innerHTML=""
                break
            case 1:
                $button.style.color="#1947F2"
                break
            case 2:
                $button.style.color="#0B873C"
                break
            case 3:
                $button.style.color="#E02909"
                break
            case 4:
                $button.style.color="#0D0699"
                break
            case 5:
                $button.style.color="#C71CE6"
                break
            case 6:
                $button.style.color="#DD0D6F"
                break
            case 7:
                $button.style.color="#A206B1"
                break
            case 8:                        
                $button.style.color="#F00B24"
                break
            case 9:
                const $img = document.createElement("img");
                $img.src = "../assets/bomb.png"
                $img.alt = "bomb"
                $img.classList.add("bomb-image")
                $button.innerHTML=""
                $button.appendChild($img)
                break;
        }
        
        
    }else{
        $button.classList.remove("is-active")
        $button.style.color= "black"
    }
    if(flag){
        const $img = document.createElement("img");
        $img.src = "../assets/bandera.png"
        $img.alt = "flag"
        $button.innerHTML=""
        $button.appendChild($img)
    }
    if(doubt){
        const $img = document.createElement("img");
        $img.src = "./assets/dudoso.png"
        $img.alt = "doubt"
        $button.innerHTML=""
        $button.appendChild($img)
    }
    if(this.buscaminas.gameOver){
        $button.disabled=true
    }
    let $clone = document.importNode($button,true)
    $fragment.appendChild($clone)
}


Game.prototype.createEventListener = function(){
    for(let row of this.buscaminas.board){
        row.forEach(el => {
            const $cell = document.querySelector(`[data-row="${el.row}"][data-column="${el.column}"]`)
            $cell.addEventListener("mouseup", e =>{ 
                this.openCell(e)
                this.$rebootButton.innerHTML="<i class='far fa-surprise'></i>"
                setTimeout(() => {    
                    this.$rebootButton.innerHTML="<i class='far fa-smile-beam'></i></i>"
                }, 200);
               
            })
    
            
        })
    }
    
}

Game.prototype.openCell = function(event){
    
    if(!this.isStart){
        this.time= new Date()
        this.isStart=true
        this.chronometer()

        
        const {row,column} = event.target.dataset

        this.buscaminas.moveMines(row,column)


    }

    if(this.isEnd)
    return

    // ? Destapar Celda
    if(event.button===0){
        const {row,column} = event.target.dataset
        
        if(!this.isStart){
            this.time= new Date()
            this.isStart=true
            this.chronometer()     
    
            this.buscaminas.moveMines(Number(row),Number(column))
            
    
        }
        

        this.buscaminas.flipCell(Number(row),Number(column))   
    }
    
    // ? Colocar Bandera o Duda
    if(event.target.matches("[data-row] img")  || event.target.matches("[data-row]") ){
        let position
        
        try {
            if(event.target.parentNode.hasAttribute("id"))
                position= event.target.dataset
            else
                throw new Error()
        } catch (err){
            
            position= event.target.parentNode.dataset
            
        }
      
           
        if(event.button===1){
            this.buscaminas.toggleDoubt(Number(position.row),Number(position.column))
            
        }
        if(event.button===2){
            this.buscaminas.toggleFlag(Number(position.row),Number(position.column))
            this.$flags.textContent= ("0" + (this.flags - this.buscaminas.countFlags()) ).slice(-2)
        }
        
        
        
        
    }
    
    
    if(!this.buscaminas.countCellsRemaining() || this.buscaminas.gameOver){
        this.isEnd=true
        this.endGame()     
    }

    this.render()
    console.log(this.buscaminas.countCellsRemaining())
}