export const Buscaminas = function(mines,row,column){
    this.mines= mines
    this.row=row
    this.column=column
    this.board = this.initializeBoard(row,column)
    this.addMines()
    this.gameOver=false
    this.isLosed=false
}

/**
 * 
 * ? Inicializa el tablero
 */
Buscaminas.prototype.initializeBoard = function(row,column){
    let board = Create2DArray(row,column)

    for(let i=0;i<row;i++){
        for(let j=0; j<column;j++){
            board[i][j]= {
                adjacentMine:0,
                isVisible:false,
                row:i,
                column:j,
                flag:false,
                doubt:false
            }
        }
    }
    console.log(this)
    return board
}



//* Funciona pero se debe mejorar cuando se termine

Buscaminas.prototype.addMines = function(){
    let num =0,
        mapRandom = new Map()

    while(num<Math.pow(this.row,2)){
        let rowRandom = Math.floor(Math.random() * (this.row-0) + 0),
            columnRandom = Math.floor(Math.random() * (this.column-0) + 0);
        let  stringCoord = {key:JSON.stringify({y:rowRandom,x:columnRandom}),value:{y:rowRandom,x:columnRandom}}
    
        mapRandom.set(stringCoord.key,stringCoord.value)
        num++
    }
    
    const coord = mapRandom.entries()

    for(let i = 0 ; i<this.mines ; i++){
        let c = coord.next()
        this.board[c.value[1].y][c.value[1].x].adjacentMine = 9;
    }

    this.addAdjacentMine()
}

/*
    ?Se encarga de hacer un recorrido por las celdas adyacentes y 
    ?contar el numero de minas que estan a su alrededor
*/

Buscaminas.prototype.addAdjacentMine = function(){
    for(let i=0;i<this.row;i++){
        for(let j=0; j<this.column;j++){
            if(this.board[i][j].adjacentMine!==9)
            this.board[i][j].adjacentMine= this.countAdjacentMine(i,j)
        }
    }
}


/*
    ?Se encarga de hacer un recorrido por las celdas adyacentes y 
    ?contar el numero de minas que estan a su alrededor
*/
Buscaminas.prototype.countAdjacentMine = function(row,column){
    let mines=0;
    
    for(let i = Math.max(0,row-1) ; i <= Math.min(this.row-1,row+1) ; i++){
        for(let j=Math.max(0,column-1) ; j <= Math.min(this.column-1,column+1) ; j++){
            if(this.board[i][j].adjacentMine===9)
                mines++;
        }
    }
    
    return mines
}

/**
 * ? Se encarga de voltear una celda. Recursividad
 * * si la posicion adyacente no posee minas se voltea
 * ! si no, queda igual
 */
Buscaminas.prototype.flipCell = function(row,column){
    
    let cell = this.board[row][column]
    if(!cell.isVisible && !cell.flag && !cell.doubt ){   
        this.board[row][column].isVisible=true
        if(cell.adjacentMine===0){
                //console.log(cell[row][column])
            for(let i = Math.max(0,row-1) ; i <= Math.min(this.row-1,row+1) ; i++){
                for(let j=Math.max(0,column-1) ; j <= Math.min(this.column-1,column+1) ; j++){
                    if(cell.adjacentMine!==9){
                        this.flipCell(i,j)
                    }        
                }
            }
        }  
    }
    
    if(cell.adjacentMine===9){
        this.exploteMines()
    }
}

/**
 * ? Termina el juego
 */

Buscaminas.prototype.endGame = function (){
    this.gameOver=true
}

/**
 * ? Explota todas las minas
 */

Buscaminas.prototype.exploteMines = function(){
    for(let row of this.board){
        row.forEach(el => {
            if(el.adjacentMine===9)
                el.isVisible=true
        });
    }
    this.isLosed=true
    this.endGame()
}


/*
    ?  Quita y pone bandera respectivamente
*/

Buscaminas.prototype.toggleFlag= function(row,column){

    if(!this.board[row][column].isVisible){
        this.board[row][column].flag
            ? this.board[row][column].flag=false
            : this.board[row][column].flag=true
        if(this.board[row][column].doubt)
            this.board[row][column].doubt=false
    }
}

/*
    ?  Quita y pone simbolo de *?*
*/
Buscaminas.prototype.toggleDoubt= function(row,column){
    if(!this.board[row][column].isVisible){    
        this.board[row][column].doubt
            ? this.board[row][column].doubt = false
            : this.board[row][column].doubt = true
            
        if(this.board[row][column].flag)
            this.board[row][column].flag = false
    }
        
}

Buscaminas.prototype.countCellsRemaining = function(){
    let acc=0
    for (let row of this.board) {
        row.forEach(el => {
            if(el.isVisible && el.adjacentMine!==9)
                acc++
        })
    }
    acc = this.row * this.column - acc - this.mines

    
    if(acc===0){
        this.endGame()
    }

    return acc
}

Buscaminas.prototype.countFlags = function(){
    let acc=0
    for (let row of this.board) {
        row.forEach(el => {
            if(el.flag)
                acc++
        })
    }
    return acc
}

Buscaminas.prototype.moveMines = function(row,column){
    if(this.board[row][column].adjacentMine!==0){
        let isVoid=false
        console.log(this.board[row][column].adjacentMine)
        console.log(row,column)
        do{
            
            
            this.board= this.initializeBoard(this.row,this.column)
            this.addMines()
           
            if(this.board[row][column].adjacentMine===0)
                isVoid=true

            console.log(this.board[row][column].adjacentMine)
            console.log(isVoid)
        }while(!isVoid)


    }
}



/*
    !  -Auxiliares functions-
    ?  Crea un arreglo de dos dimensiones
*/
function Create2DArray(rows,columns) {
    let x = new Array(rows);
    for (let i = 0; i < rows; i++) {
        x[i] = new Array(columns);
    }
    return x;
}

