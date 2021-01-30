
const mazeSolver={
    intervalCode:0,
    path:[],
    prevV:[],
    isVisited:[],
    allSq:[],
    nextBFSRound:[],
    currBFSRound:[],
    isMouseDown:false,
    mazeType:'',

    cleanInstVars(){
        mazeSolver.intervalCode=0;
        mazeSolver.path=[];
        mazeSolver.prevV=[];
        mazeSolver.isVisited=[];
        mazeSolver.allSq=[];
        mazeSolver.nextBFSRound=[];
        mazeSolver.currBFSRound=[];
        mazeSolver.isMouseDown=false;
        mazeSolver.mazeType='';

        var curr=document.getElementsByClassName('current');
        while(curr.length>0){
            curr[0].classList.remove('current');
        }
        var explored=document.getElementsByClassName('explored');
        while(explored.length>0){
            explored[0].classList.remove('explored');
        }

        mazeSolver.allSq=document.getElementsByClassName('hardSquare');
    },
    pickEntrance(event){
        const prevEntrance=document.getElementsByClassName('entrance');
        if (prevEntrance.length!==0){
          prevEntrance[0].classList.remove('entrance');
        }
        event.target.classList.add('entrance');

        for (var i=0;i<mazeSolver.allSq.length;i++){    
            mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverEntrance);
            mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverEntrance);
            mazeSolver.allSq[i].removeEventListener('click',mazeSolver.pickEntrance);
        }

        const setBtn=document.getElementsByClassName('setBtn');
        setBtn[1].classList.remove('greenBtn');
    },
    toggleHoverEntrance(event){
        event.target.classList.toggle('hoverEntrance');
    },
    pickExit(event){
        const prevExit=document.getElementsByClassName('exit');
        if (prevExit.length!==0){
          prevExit[0].classList.remove('exit');
        }
        event.target.classList.add('exit');

        for (var i=0;i<mazeSolver.allSq.length;i++){      
            mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverExit);
            mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverExit);
            mazeSolver.allSq[i].removeEventListener('click',mazeSolver.pickExit);
        }

        const setBtn=document.getElementsByClassName('setBtn');
        setBtn[2].classList.remove('redBtn');
    },
    toggleHoverExit(event){
        event.target.classList.toggle('hoverExit');
    },
    toggleHoverObstacle(event){

        if (event.target.classList.contains('obstacle'))
            return;
            
        if (!mazeSolver.isMouseDown)
            event.target.classList.toggle('hoverObstacle');
        if (mazeSolver.isMouseDown)
            event.target.classList.add('obstacle');
    },
    pickObstacle(event){
        mazeSolver.isMouseDown=true;
        event.target.classList.add('obstacle');
        event.target.classList.remove('hoverObstacle');
    },
    release(event){
        mazeSolver.isMouseDown=false;
    },
    setEntrance(difficulty){
        var sqId="";
        switch(difficulty){
            case "easy":
                sqId="easySquare";
                break;
            case "medium":
                sqId="mediumSquare";
                break;
            case "hard":
                sqId="hardSquare";
                break;
            default:
                break;
            }

        mazeSolver.allSq=document.getElementsByClassName(sqId);
        for (var i=0;i<mazeSolver.allSq.length;i++){

        mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverExit);
        mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverExit);
        mazeSolver.allSq[i].removeEventListener('click',mazeSolver.pickExit);

        mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverObstacle);
        mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverObstacle);
        mazeSolver.allSq[i].removeEventListener('mousedown',mazeSolver.pickObstacle);
        mazeSolver.allSq[i].removeEventListener('mouseup',mazeSolver.release);

        mazeSolver.allSq[i].addEventListener('mouseenter',mazeSolver.toggleHoverEntrance);
        mazeSolver.allSq[i].addEventListener('mouseout',mazeSolver.toggleHoverEntrance);
        mazeSolver.allSq[i].addEventListener('click',mazeSolver.pickEntrance);
        }
    },
    setExit(difficulty){
        var sqId="";
        switch(difficulty){
            case "easy":
                sqId="easySquare";
                break;
            case "medium":
                sqId="mediumSquare";
                break;
            case "hard":
                sqId="hardSquare";
                break;
            default:
                break;
        }
    
        mazeSolver.allSq=document.getElementsByClassName(sqId);
        for (var i=0;i<mazeSolver.allSq.length;i++){
    
          mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverEntrance);
          mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverEntrance);
          mazeSolver.allSq[i].removeEventListener('click',mazeSolver.pickEntrance);

          mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverObstacle);
          mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverObstacle);
          mazeSolver.allSq[i].removeEventListener('mousedown',mazeSolver.pickObstacle);
          mazeSolver.allSq[i].removeEventListener('mouseup',mazeSolver.release);
    
          mazeSolver.allSq[i].addEventListener('mouseenter',mazeSolver.toggleHoverExit);
          mazeSolver.allSq[i].addEventListener('mouseout',mazeSolver.toggleHoverExit);
          mazeSolver.allSq[i].addEventListener('click',mazeSolver.pickExit);
        }
    },
    setObstacle(difficulty){
        var sqId="";
        switch(difficulty){
            case "easy":
                sqId="easySquare";
                break;
            case "medium":
                sqId="mediumSquare";
                break;
            case "hard":
                sqId="hardSquare";
                break;
            default:
                break;
            }

        mazeSolver.allSq=document.getElementsByClassName(sqId);
        for (var i=0;i<mazeSolver.allSq.length;i++){

        mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverExit);
        mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverExit);
        mazeSolver.allSq[i].removeEventListener('click',mazeSolver.pickExit);

        mazeSolver.allSq[i].removeEventListener('mouseenter',mazeSolver.toggleHoverEntrance);
        mazeSolver.allSq[i].removeEventListener('mouseout',mazeSolver.toggleHoverEntrance);
        mazeSolver.allSq[i].removeEventListener('click',mazeSolver.pickEntrance);

        mazeSolver.allSq[i].addEventListener('mouseenter',mazeSolver.toggleHoverObstacle);
        mazeSolver.allSq[i].addEventListener('mouseout',mazeSolver.toggleHoverObstacle);
        mazeSolver.allSq[i].addEventListener('mousedown',mazeSolver.pickObstacle);
        mazeSolver.allSq[i].addEventListener('mouseup',mazeSolver.release);
        }
    },
    getNbrKey(currKey, direction){
        const gridSize=mazeSolver.allSq.length;
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

        var up=0,down=0,right=0,left=0;
        switch (direction){
            case 'up':
                return (mazeSolver.allSq[currKey].classList.contains('top'))?-1:currKey-rowSize;
            case 'down':
                return (mazeSolver.allSq[currKey].classList.contains('bottom'))?-1:currKey+rowSize;
            case 'left':
                return (mazeSolver.allSq[currKey].classList.contains('left'))?-1:currKey-1;
            case 'right':
                return (mazeSolver.allSq[currKey].classList.contains('right'))?-1:currKey+1;
            case 'upLeft':
                up=mazeSolver.getNbrKey(currKey,'up');
                left=mazeSolver.getNbrKey(currKey,'left');
                return (up===-1 || left===-1)?-1:currKey-rowSize-1;
            case 'upRight':
                up=mazeSolver.getNbrKey(currKey,'up');
                right=mazeSolver.getNbrKey(currKey,'right');
                return (up===-1 || right===-1)?-1:currKey-rowSize+1;
            case 'downLeft':
                down=mazeSolver.getNbrKey(currKey,'down');
                left=mazeSolver.getNbrKey(currKey,'left');
                return (down===-1 || left===-1)?-1:currKey+rowSize-1;
            case 'downRight':
                down=mazeSolver.getNbrKey(currKey,'down');
                right=mazeSolver.getNbrKey(currKey,'right');
                return (down===-1 || right===-1)?-1:currKey+rowSize+1;
            default:
                return -1;
        }
    },
    extractPath(){
        var exitKey=document.getElementsByClassName('exit')[0].getAttribute('key');
        while(mazeSolver.prevV[exitKey]!==-1){
            mazeSolver.path.unshift(exitKey);
            exitKey=mazeSolver.prevV[exitKey];
        }
        mazeSolver.path.unshift(exitKey);
    },
    backTrackPath(){

        var timeInterval=0;
        const gridSize=mazeSolver.allSq.length;
        switch(gridSize){
            case 64:
                timeInterval=50;
                break;
            case 300:
                timeInterval=25;
                break;
            case 1344:
                timeInterval=5;
                break;
            default:
                break;
        }


        mazeSolver.intervalCode=setInterval(()=>{

            if(mazeSolver.path.length===0){
                clearInterval(mazeSolver.intervalCode);
                return;
            }
            
            const lastPos=parseInt(mazeSolver.path.pop(),10);
            mazeSolver.allSq[lastPos].classList.add('current');
        },timeInterval);
    },
    isDiagonalSneak(currKey,direction){
        var horizontalNbrKey=0,verticalNbrKey=0;
        switch(direction){
            case 'upRight':
                horizontalNbrKey=mazeSolver.getNbrKey(currKey,'right');
                verticalNbrKey=mazeSolver.getNbrKey(currKey,'up');
                break;
            case 'upLeft':
                horizontalNbrKey=mazeSolver.getNbrKey(currKey,'left');
                verticalNbrKey=mazeSolver.getNbrKey(currKey,'up');
                break;
            case 'downRight':
                horizontalNbrKey=mazeSolver.getNbrKey(currKey,'right');
                verticalNbrKey=mazeSolver.getNbrKey(currKey,'down');
                break;
            case 'downLeft':
                horizontalNbrKey=mazeSolver.getNbrKey(currKey,'left');
                verticalNbrKey=mazeSolver.getNbrKey(currKey,'down');
                break;
            default:
                break;
        }

        if (horizontalNbrKey==-1 || verticalNbrKey==-1){
            console.log("NEGS");
        }

        const hzntlWall=mazeSolver.allSq[horizontalNbrKey].classList.contains('obstacle');
        const verticalWall=mazeSolver.allSq[verticalNbrKey].classList.contains('obstacle');
        return (hzntlWall && verticalWall);
        
    },
    dfs(difficulty){
        mazeSolver.cleanInstVars();
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

        //initialize allSq, isVisited, path, mazeType
        for (var i=0;i<mazeSolver.allSq.length;i++){
            mazeSolver.isVisited.push(false);
            mazeSolver.prevV.push(-1);
        }
        const entranceKey=document.getElementsByClassName('entrance')[0].getAttribute('key');
        mazeSolver.isVisited[entranceKey]=true;
        mazeSolver.path.push(entranceKey);
        const cleanSlateSq=document.getElementsByClassName('cleanSlateSq');
        mazeSolver.mazeType=(cleanSlateSq.length===0)?'maze':'cleanSlate';

        //actual dfs logic starts here
        const diagonalMoves=["right","left","up","down","upRight","upLeft","downRight","downLeft"];
        const nonDiagonalMoves=["right","left","up","down"];
        const nbrPositions=(mazeSolver.mazeType==="cleanSlate")?diagonalMoves:nonDiagonalMoves;

        mazeSolver.intervalCode=setInterval(()=>{

            //get last element in path
            const currPos=parseInt(mazeSolver.path[mazeSolver.path.length-1],10);

            //if last element is exit, commence exit backtrack
            if (mazeSolver.allSq[currPos].classList.contains('exit')){
                clearInterval(mazeSolver.intervalCode);
                mazeSolver.backTrackPath();
                return;
            }

            //if last element not exit, mark current as explored, look at nbrs
            mazeSolver.allSq[currPos].classList.remove('current');
            mazeSolver.allSq[currPos].classList.add('explored');
            for (var i=0;i<nbrPositions.length;i++){
                const nbrKey=mazeSolver.getNbrKey(currPos,nbrPositions[i]);
                if (nbrKey!==-1 && !mazeSolver.isVisited[nbrKey] && !mazeSolver.allSq[nbrKey].classList.contains('obstacle')){

                    if (i>3 && mazeSolver.isDiagonalSneak(currPos,nbrPositions[i]))
                        continue;

                    mazeSolver.isVisited[nbrKey]=true;
                    mazeSolver.path.push(nbrKey);
                    mazeSolver.prevV[nbrKey]=currPos;
                    return;
                }
            }
            mazeSolver.path.pop();
            
        },timeInterval)
    },
    bfs(difficulty){
        mazeSolver.cleanInstVars();
        var timeInterval=0;
        switch(difficulty){
            case "easy":
                timeInterval=40;
                break;
            case "medium":
                timeInterval=15;
                break;
            case "hard":
                timeInterval=100;
                break;
            default:
                break;
        }


        //initialize isVisited, path, and move types
        for (var i=0;i<mazeSolver.allSq.length;i++){
            mazeSolver.isVisited.push(false);
            mazeSolver.prevV.push(-1);
        }
        const cleanSlateSq=document.getElementsByClassName('cleanSlateSq');
        mazeSolver.mazeType=(cleanSlateSq.length===0)?'maze':'cleanSlate';
        const diagonalMoves=["right","left","up","down","upRight","upLeft","downRight","downLeft"];
        const nonDiagonalMoves=["right","left","up","down"];
        const nbrPositions=(mazeSolver.mazeType==="cleanSlate")?diagonalMoves:nonDiagonalMoves;

        //actual bfs logic starts here
        const entranceKey=document.getElementsByClassName('entrance')[0].getAttribute('key');
        mazeSolver.isVisited[entranceKey]=true;
        mazeSolver.nextBFSRound.push(entranceKey);

        mazeSolver.intervalCode=setInterval(()=>{

            mazeSolver.currBFSRound=mazeSolver.nextBFSRound.concat();
            mazeSolver.nextBFSRound=[];
            while(mazeSolver.currBFSRound.length>0){
           
                const currKey=parseInt(mazeSolver.currBFSRound.shift(),10);

                if (mazeSolver.allSq[currKey].classList.contains('exit')){
                    clearInterval(mazeSolver.intervalCode);
                    mazeSolver.extractPath();
                    mazeSolver.backTrackPath();
                }
                for (var i=0;i<nbrPositions.length;i++){
                    const nbrKey=mazeSolver.getNbrKey(currKey,nbrPositions[i]);
                    if (nbrKey!==-1 && !mazeSolver.isVisited[nbrKey] && !mazeSolver.allSq[nbrKey].classList.contains('obstacle')){

                        if (i>3 && mazeSolver.isDiagonalSneak(currKey,nbrPositions[i]))
                            continue;

                        mazeSolver.isVisited[nbrKey]=true;
                        mazeSolver.prevV[nbrKey]=currKey;
                        mazeSolver.allSq[nbrKey].classList.add('explored');
                        mazeSolver.nextBFSRound.push(nbrKey);
                    }
                }
            }
        },timeInterval)
    }
}

export default mazeSolver