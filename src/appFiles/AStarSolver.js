import priorityQueue from "./priorityQueue";

const AStarSolver={
    allSq:[],
    entranceCoord:[],
    exitCoord:[],
    exitKey:0,
    nextPQ:{},
    intervalCode:0,
    parents:[],
    path:[],
    mazeType:"",

    cleanInstVars(){
        AStarSolver.allSq=[];
        AStarSolver.entranceCoord=[];
        AStarSolver.exitCoord=[];
        AStarSolver.exitKey=0;
        AStarSolver.nextPQ={};
        AStarSolver.intervalCode=0;
        AStarSolver.parents=[];
        AStarSolver.path=[];
        AStarSolver.mazeType="";
    },
    getCoord(id){
        const row=Math.floor(id/56);
        const col=Math.floor(id%56);
        return [row,col];
    },
    getEntranceExitCoord(){
        const entranceKey=document.getElementsByClassName('entrance')[0].getAttribute('key');
        AStarSolver.entranceCoord=AStarSolver.getCoord(entranceKey);
        
        const exitKey=document.getElementsByClassName('exit')[0].getAttribute('key');
        AStarSolver.exitCoord=AStarSolver.getCoord(exitKey);
        AStarSolver.exitKey=parseInt(exitKey,10);

        const emptySlateSq=document.getElementsByClassName('emptySlateSq');
        AStarSolver.mazeType=(emptySlateSq.length===0)?"maze":"cleanSlate";
    },
    getDistEntrance(id){
        const idCoord=AStarSolver.getCoord(id);
        const di=Math.abs(AStarSolver.entranceCoord[0]-idCoord[0]);
        const dj=Math.abs(AStarSolver.entranceCoord[1]-idCoord[1]);
        const dist=Math.round(Math.sqrt(di*di+dj*dj));
        return dist;
    },
    getDistExit(id){
        const idCoord=AStarSolver.getCoord(id);
        const di=Math.abs(AStarSolver.exitCoord[0]-idCoord[0]);
        const dj=Math.abs(AStarSolver.exitCoord[1]-idCoord[1]);
        const dist=Math.round(Math.sqrt(di*di+dj*dj));
        return dist;
    },
    getFCost(id){
        const distEntrance=AStarSolver.getDistEntrance(id);
        const distExit=AStarSolver.getDistExit(id);
        return distEntrance+distExit;
    },
    getNbrKey(currKey,direction){
        const gridSize=AStarSolver.allSq.length;
        currKey=parseInt(currKey,10);
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
        rowSize=parseInt(rowSize,10);

        var up=0,down=0,right=0,left=0;
        switch(direction){
            case 'up':
                return (AStarSolver.allSq[currKey].classList.contains('top'))?-1:currKey-rowSize;
            case 'down':
                return (AStarSolver.allSq[currKey].classList.contains('bottom'))?-1:currKey+rowSize;
            case 'left':
                return (AStarSolver.allSq[currKey].classList.contains('left'))?-1:currKey-1;
            case 'right':
                return (AStarSolver.allSq[currKey].classList.contains('right'))?-1:currKey+1;
            case 'upLeft':
                up=AStarSolver.getNbrKey(currKey,'up');
                left=AStarSolver.getNbrKey(currKey,'left');
                return (up===-1 || left===-1)?-1:currKey-rowSize-1;
            case 'upRight':
                up=AStarSolver.getNbrKey(currKey,'up');
                right=AStarSolver.getNbrKey(currKey,'right');
                return (up===-1 || right===-1)?-1:currKey-rowSize+1;
            case 'downLeft':
                down=AStarSolver.getNbrKey(currKey,'down');
                left=AStarSolver.getNbrKey(currKey,'left');
                return (down===-1 || left===-1)?-1:currKey+rowSize-1;
            case 'downRight':
                down=AStarSolver.getNbrKey(currKey,'down');
                right=AStarSolver.getNbrKey(currKey,'right');
                return (down===-1 || right===-1)?-1:currKey+rowSize+1;
            default:
                return -1;
        }
    },
    isDiagonalSneak(currKey,direction){
        var horizontalNbrKey=0,verticalNbrKey=0;
        switch(direction){
            case 'upRight':
                horizontalNbrKey=AStarSolver.getNbrKey(currKey,'right');
                verticalNbrKey=AStarSolver.getNbrKey(currKey,'up');
                break;
            case 'upLeft':
                horizontalNbrKey=AStarSolver.getNbrKey(currKey,'left');
                verticalNbrKey=AStarSolver.getNbrKey(currKey,'up');
                break;
            case 'downRight':
                horizontalNbrKey=AStarSolver.getNbrKey(currKey,'right');
                verticalNbrKey=AStarSolver.getNbrKey(currKey,'down');
                break;
            case 'downLeft':
                horizontalNbrKey=AStarSolver.getNbrKey(currKey,'left');
                verticalNbrKey=AStarSolver.getNbrKey(currKey,'down');
                break;
            default:
                break;
        }

        
        const hzntlWall=AStarSolver.allSq[horizontalNbrKey].classList.contains('obstacle');
        const verticalWall=AStarSolver.allSq[verticalNbrKey].classList.contains('obstacle');
        return (hzntlWall && verticalWall);
        
    },
    extractPath(){
        var exitKey=AStarSolver.exitKey;
        while(AStarSolver.parents[exitKey]!==-1){
            AStarSolver.path.unshift(exitKey);
            exitKey=AStarSolver.parents[exitKey];
        }
        AStarSolver.path.unshift(exitKey);
    },
    backTrackPath(){

        var timeInterval=0;
        
        AStarSolver.intervalCode=setInterval(()=>{

            if(AStarSolver.path.length===0){
                clearInterval(AStarSolver.intervalCode);
                return;
            }
            
            const lastPos=parseInt(AStarSolver.path.pop(),10);
            AStarSolver.allSq[lastPos].classList.add('current');
        },5);
    },
    solve(difficulty){
        AStarSolver.cleanInstVars();

        //initializing my instance vars and containers
        AStarSolver.allSq=document.getElementsByClassName('hardSquare');

        AStarSolver.getEntranceExitCoord();
        for (var i=0;i<AStarSolver.allSq.length;i++){
            AStarSolver.parents.push(-1);
        }
        AStarSolver.nextPQ=new priorityQueue();
        const diagonalMoves=['up','down','left','right','upLeft','upRight','downRight','downLeft'];
        const nonDiagonalMoves=['up','down','left','right'];

        //pushing entranceKey into PQ
        const entranceKey=document.getElementsByClassName('entrance')[0].getAttribute('key');
        AStarSolver.nextPQ.push([0,entranceKey]);



        AStarSolver.intervalCode=setInterval(()=>{

            const curr=AStarSolver.nextPQ.top();
            AStarSolver.nextPQ.pop();

            var currKey=curr[1];

            if (AStarSolver.nextPQ.size()===0){
                clearInterval(AStarSolver.intervalCode);
                return;
            }

            //early release to avoid processing nodes that are already in set
            while(AStarSolver.allSq[currKey].classList.contains('set')){
                const curr=AStarSolver.nextPQ.top();
                AStarSolver.nextPQ.pop();
                currKey=curr[1];
                if (AStarSolver.nextPQ.size()===1){
                    clearInterval(AStarSolver.intervalCode);
                    return;
                }
            }

            AStarSolver.allSq[currKey].classList.remove('PQ');
            AStarSolver.allSq[currKey].classList.add('set');

            var nbrPos=(AStarSolver.mazeType==="cleanSlate")?diagonalMoves:nonDiagonalMoves;
            
            for (var i=0;i<nbrPos.length;i++){
                const nbrKey=parseInt(AStarSolver.getNbrKey(currKey,nbrPos[i]),10);
                //skip nbr if its an out of bounds,obstacle or its already in visitedSet
                if (nbrKey>=AStarSolver.allSq.length){
                    console.log("ERROR: "+nbrKey);
                    continue;
                }
                if (nbrKey==-1)
                    continue;
                if (AStarSolver.allSq[nbrKey].classList.contains('obstacle'))
                    continue;
                if (i>3 && AStarSolver.isDiagonalSneak(currKey,nbrPos[i]))
                    continue;
                if (AStarSolver.allSq[nbrKey].classList.contains('set'))
                    continue;
                
                const nbrF=AStarSolver.getFCost(nbrKey);
                AStarSolver.parents[nbrKey]=currKey;
                AStarSolver.allSq[nbrKey].classList.add('PQ');
                AStarSolver.nextPQ.push([nbrF,nbrKey]);

                if (nbrKey===AStarSolver.exitKey){
                    clearInterval(AStarSolver.intervalCode);
                    AStarSolver.extractPath();
                    AStarSolver.backTrackPath();
                    return;
                }

            }
        },10)



    }
}

export default AStarSolver