// Rover Object Goes Here
// ======================
    let rover1 = {
        id:"Rover 1",
        direction:"N",
        x:0,
        y:0,
        travelLog: [],
        isMyTurn:true
    };  

    let rover2 = {
        id:"Rover 2",
        direction:"N",
        x:0,
        y:1,
        travelLog: [],
        isMyTurn:false
    }; 

    let rovers=[rover1,rover2];

    let grid=[
        [rover1, rover2,null,"Batman",null,null,null,null,null,null],
        [null,null,"Thanos",null,null,null,null,"Harry Potter",null,null],
        [null, null, null, null, null, null, "Captain America", null, null, null],
        [null, null, null, null, null, null, null, null, "Spider-Man", null],
        [null, "Black Widow", null, null, "a white walker", null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, "Venom"],
        [null, null, null, null, "Ghost", null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, "Joker", null, null]
        [null, null, null, "Black Phanter", null, null, null, "Tony Stark", null, null],
    ];

    //=============Turns and Going======================
    function turnLeft(rover){
        console.log("turnLeft was called!");
        newDirection(rover.direction, 'left', rover);
    }

    function turnRight(rover){
        console.log('turnRight was called!');
        newDirection(rover.direction, 'right', rover);
    }

    function moveForward(rover){
        console.log("moveForward was called!");
        let itMoved = makeMovement (rover,'forward');
        saveMovement(rover, itMoved);
        newDirection(rover.direction, 'right', rover);
        nextTurn(rover);
    }

    function moveBackwards(rover){
        console.log('moveBackwards was called!');
        let itMoved = makeMovement(rover, 'backwards');
        saveMovement(rover, itMoved);
        newDirection(rover.direction, 'right', rover);
        nextTurn(rover);
    }
    //===================================
    //===========Moving========================
    function makeMovement(rover, movement){
        console.log(`${rover.id} current position is: [${rover.x},${rover.y}].`);
        let itMoved = true;
        switch (rover.direction){
            case 'N':
                if(movement==='forward'){
                    itMoved=checkMovement(rover.x - 1, rover.y, rover);
                } else if (movement==='backwards'){
                    itMoved=checkMovement(rover.x + 1, rover.y, rover);
                } break;
            case 'W':
                if(movement==='forward'){
                    itMoved=checkMovement(rover.x, rover.y - 1, rover);
                } else if (movement==='backwards'){
                    itMoved=checkMovement(rover.x, rover.y + 1, rover);
                } break;
            case 'S':
                if(movement==='forward'){
                    itMoved=checkMovement(rover.x + 1, rover.y, rover);
                } else if (movement==='backwards'){
                    itMoved=checkMovement(rover.x - 1, rover.y, rover);
                } break;
            case 'E':
                if(movement==='forward'){
                    itMoved=checkMovement(rover.x, rover.y + 1, rover);
                } else if (movement==='backwards'){
                    itMoved=checkMovement(rover.x, rover.y - 1, rover);
                } break;
        }
        return itMoved;
    }
    //===================================
    //==============Checking each movement=====================
    function checkMovement(roverNewX, roverNewY, rover){
        let itMoved=true;
        if(roverNewX===-1 || roverNewY===-1){
            console.log(`Hold it right there! ${rover.id} can not go out of boundaries!`);
            itMoved=false;
        } else {
            if(grid[roverNewX][roverNewY]===null){
                grid[rover.x][rover.y]=null;
                grid[roverNewX][roverNewY] = rover;
                rover.x= roverNewX;
                rover.y= roverNewY;
            } else{
                if(typeof grid[roverNewX][roverNewY]==='string'){
                    console.log(`Hold up! Can't move. ${rover.id} would bump into ${grid[roverNewX][roverNewY]}.`);
                    itMoved= false;
                } else {
                    console.log(`Hold up! Can't move. ${rover.id} would bump into ${grid[roverNewX][roverNewY].id}.`);
                    itMoved= false;
                }
            }
        }
        return itMoved;
    }
    //===================================
    //==============Saving each movement=====================
    function saveMovement(rover, itMoved){
        if(itMoved){
            rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
            console.log(`${rover.id} is moving to ${rover.direction}. New position is [${rover.x},${rover.y}].`);
        } else {
            console.log(`${rover.id} is not moving to ${rover.direction}. It stays in [${rover.x},${rover.y}].`);
        }
    }

    function newDirection(currentDirection, turnTo, rover){
        switch (currentDirection){
            case 'N':
                if(turnTo==='right'){
                    rover.direction='E';
                } else if(turnTo==='left'){
                    rover.direction='W';
                } break;
            case 'W':
                if(turnTo==='right'){
                    rover.direction='N';
                } else if(turnTo==='left'){
                    rover.direction='S';
                } break;
            case 'S':
                if(turnTo==='right'){
                    rover.direction='W';
                } else if(turnTo==='left'){
                    rover.direction='E';
                } break;
            case 'E':
                if(turnTo==='right'){
                    rover.direction='S';
                } else if(turnTo==='left'){
                    rover.direction='N';
                } break;    
        }
    }
    //===================================
    //===============Which Rover moves====================
    function checkRoverWithTurn(){
    let roverWithTurn;
    for (let rover in rovers){
      if (rovers[rover].isMyTurn) roverWithTurn = rovers[rover];
    }
    return roverWithTurn;
  }
    //===================================
    //==============Change Rover turn=====================
    function nextTurn(currentRover){
        let indexOfCurrentRover=rovers.indexOf(currentRover);
        currentRover.isMyTurn=false;
        if(indexOfCurrentRover===rovers.length - 1){
            rovers[0].isMyTurn=true;
        } else{
            rovers[indexOfCurrentRover + 1].isMyTurn= true;
        }
    }
    //===================================
    //===============Finally give command to Rover====================
    function roverExploring (commands) {
    let rover;
    for (let i=0; i<commands.length; i++){
      rover = checkRoverWithTurn();
      if(rover.travelLog.length === 0)
        rover.travelLog.push("[" + rover.x + "," + rover.y + "]");
  
      if(commands[i] === "f") moveForward(rover);
      else if (commands[i] === "b") moveBackwards(rover);
      else if (commands[i] === "l") turnLeft(rover);
      else if (commands[i] === "r") turnRight(rover);
      else console.log("Command NOT correct, you can only use 'f', 'b', 'r' and 'l'");
    }

        for (let roverX in rovers) {
      logMovements(rovers[roverX]);
    }
  }
    //===================================
    //==============Rover Travel Log=====================
    function logMovements(rover){
    console.log(rover.id + "\'s Travel Log: \n");
    for(let movement in rover.travelLog){
      console.log(rover.travelLog[movement]);
    }
  }
    //===================================

    roverExploring ("brflbbflrllrffrblfrblrfbrfbffrlfrlflbfrblrfblrfrlflrbflfbrlfflrlbfrlflrflrflfbbbbbbbbbrffffffffffffff");

    roverExploring ("rfrfff");