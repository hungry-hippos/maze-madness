const mazeGeneration={
    allSq:[],
    isVisited:[],
    firstKey:0,
    exitKey:0,
    posStack:[],
    visitedCounter:0,
    intervalCode:0,

    //initialized allSq and isVisited arrays
    populateMaze(difficulty){

        var numOfSquares=0;
        var sqId="";
        var mazeId="";
        switch(difficulty){
            case "easy":
                numOfSquares=64;
                sqId="easySquare";
                mazeId="easyMaze";
                break;
            case "medium":
                numOfSquares=300;
                sqId="mediumSquare";
                mazeId="mediumMaze";
                break;
            case "hard":
                numOfSquares=1344;
                sqId="hardSquare";
                mazeId="hardMaze";
                break;
            default:
                break;
        }

        for (var i=0;i<numOfSquares;i++){
            const sq=document.createElement('div');
            sq.classList.add(sqId);
            sq.classList.add('top');
            sq.classList.add('bottom');
            sq.classList.add('left');
            sq.classList.add('right');
            sq.setAttribute('key',i);
            document.getElementById(mazeId).appendChild(sq);  
            mazeGeneration.allSq.push(sq);
            mazeGeneration.isVisited.push(false);
        }
        
        
        
    },
    pickStartingSq(difficulty){
        var num=0;

        if (difficulty==='easy'){
            num=Math.floor(Math.random()*7.99);
        }
        if (difficulty==='medium'){
            num=Math.floor(Math.random()*19.99);
        }
        if (difficulty==='hard'){
            num=Math.floor(Math.random()*55.99);
        }
        mazeGeneration.firstKey=num;
        mazeGeneration.isVisited[num]=true;
        mazeGeneration.allSq[num].classList.add('current');
        // mazeGeneration.allSq[num].classList.add('entrance');

        mazeGeneration.posStack.push(num);
        mazeGeneration.visitedCounter++;
    },
    currentMovement(currKey,direction){
        var nextKey=0;
        var rowSize=0;
        switch(mazeGeneration.allSq.length){
            case 64:
                rowSize=8;
                break;
            case 300:
                rowSize=20;
                break;
            case 1344:
                rowSize=56;
                break;
            default:
                break;
        }
        switch(direction){
            case 'up':
                nextKey=currKey-rowSize;
                mazeGeneration.allSq[currKey].classList.remove('top');
                mazeGeneration.allSq[nextKey].classList.remove('bottom');

                mazeGeneration.allSq[currKey].classList.remove('current');
                mazeGeneration.allSq[nextKey].classList.add('current');

                break;
            case 'down':
                nextKey=currKey+rowSize;
                mazeGeneration.allSq[currKey].classList.remove('bottom');
                mazeGeneration.allSq[nextKey].classList.remove('top');

                mazeGeneration.allSq[currKey].classList.remove('current');
                mazeGeneration.allSq[nextKey].classList.add('current');
                break;
            case 'left':
                nextKey=currKey-1;
                mazeGeneration.allSq[currKey].classList.remove('left');
                mazeGeneration.allSq[nextKey].classList.remove('right');

                mazeGeneration.allSq[currKey].classList.remove('current');
                mazeGeneration.allSq[nextKey].classList.add('current');
                break;
            case 'right':
                nextKey=currKey+1;
                mazeGeneration.allSq[currKey].classList.remove('right');
                mazeGeneration.allSq[nextKey].classList.remove('left');

                mazeGeneration.allSq[currKey].classList.remove('current');
                mazeGeneration.allSq[nextKey].classList.add('current');
                break;

            default:
                break;
        }
    },
    getNbrKey(currKey,direction){
        const gridSize=mazeGeneration.isVisited.length;
        var rowSize=0;
        switch(gridSize){
            case 64:
                rowSize=8;
                break;
            case 300:
                rowSize=20;
                break;
            case 1344:
                rowSize=56;
                break;
            default:
                break;
        }  

        switch (direction){
            case 'up':
                return (currKey<rowSize)?-1:currKey-rowSize;
            case 'down':
                return ((gridSize-rowSize)<=currKey)?-1:currKey+rowSize;
            case 'left':
                return ((currKey%rowSize)===0)?-1:currKey-1;
            case 'right':
                return ((currKey+1)%rowSize===0)?-1:currKey+1;
            default:
                break;
        }
    },
    //generates the maze walls using a timeInterval
    stackRandomMazeGenerator(difficulty){

        var timeInterval=0;
        switch(difficulty){
            case "easy":
                timeInterval=40;
                break;
            case "medium":
                timeInterval=15;
                break;
            case "hard":
                timeInterval=1;
                break;
            default:
                break;
        }
        var nbrPositions=["up","down","left","right"];

        mazeGeneration.intervalCode=setInterval(()=>{
            if (mazeGeneration.visitedCounter===mazeGeneration.isVisited.length){
                clearInterval(mazeGeneration.intervalCode);
                document.getElementsByClassName('current')[0].classList.add('visited');
                document.getElementsByClassName('current')[0].classList.remove('current');
                return;
            }

            document.getElementsByClassName('current')[0].classList.add('visited');
            document.getElementsByClassName('current')[0].classList.remove('current');
            const currPos=mazeGeneration.posStack[mazeGeneration.posStack.length-1];
            mazeGeneration.allSq[currPos].classList.add('current');          

            nbrPositions.sort(()=>Math.random()-.5);

            for (var i=0;i<4;i++){
                const nbrKey=mazeGeneration.getNbrKey(currPos,nbrPositions[i]);
                if (nbrKey!==-1 && !mazeGeneration.isVisited[nbrKey]){
                    mazeGeneration.currentMovement(currPos,nbrPositions[i]);
                    mazeGeneration.isVisited[nbrKey]=true;
                    mazeGeneration.posStack.push(nbrKey);
                    mazeGeneration.visitedCounter++;
                    return;
                }
            }
            mazeGeneration.posStack.pop();
        },timeInterval)
    },
    //this function isn't really used but I keep it cause its cool
    recursiveRandomMazeGenerator(currKey){

        //shuffle all poss nbrs
        var nbrPositions=["up","down","left","right"];
        nbrPositions.sort(()=>Math.random()-.5);

        //recurse into each nbr
        for (var i=0;i<4;i++){

            const direction=nbrPositions[i];
            const nbrKey=mazeGeneration.getNbrKey(currKey,direction);

            if (nbrKey!==-1 && !mazeGeneration.isVisited[nbrKey]){
                mazeGeneration.isVisited[nbrKey]=true;
                mazeGeneration.currentMovement(currKey,direction);
                mazeGeneration.recursiveRandomMazeGenerator(nbrKey);
            }
        }
    },
    //easily called function that calls all steps required to generate the maze
    createMaze(difficulty){

        mazeGeneration.populateMaze(difficulty);
        mazeGeneration.pickStartingSq(difficulty);
        mazeGeneration.stackRandomMazeGenerator(difficulty);
    }
}

export default mazeGeneration