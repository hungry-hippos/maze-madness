import priorityQueue from "./priorityQueue";

const AStarSolver={
    allSq:[],
    entranceCoord:[],
    exitCoord:[],
    exitKey:0,
    nextPQ:{},
    visitedSet:{},
    intervalCode:0,
    parents:[],

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
        AStarSolver.exitKey=exitKey;

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

        switch (direction){
            case 'up':
                return (currKey<rowSize)?-1:currKey-rowSize;
            case 'down':
                return ((gridSize-rowSize)<=currKey)?-1:currKey+rowSize;
            case 'left':
                return ((currKey%rowSize)===0)?-1:currKey-1;
            case 'right':
                return ((currKey+1)%rowSize===0)?-1:currKey+1;
            case 'upLeft':
                return (currKey<rowSize || (currKey%rowSize)===0)?-1:currKey-rowSize-1;
            case 'upRight':
                return (currKey<rowSize || (currKey+1)%rowSize===0)?-1:currKey-rowSize+1;
            case 'downLeft':
                return ((gridSize-rowSize)<=currKey || (currKey%rowSize)===0)?-1:currKey+rowSize-1;
            case 'downRight':
                return ((gridSize-rowSize)<=currKey || ((currKey+1)%rowSize)===0)?-1:currKey+rowSize+1;
            default:
                return -1;
        }
    },
    solve(difficulty){

        //initializing my instance vars and containers
        AStarSolver.allSq=document.getElementsByClassName('cleanSlateSq');
        AStarSolver.getEntranceExitCoord();
        for (var i=0;i<AStarSolver.allSq.length;i++){
            AStarSolver.parents.push(-1);
        }
        AStarSolver.nextPQ=new priorityQueue();
        AStarSolver.visitedSet=new Set();

        //pushing entranceKey into PQ
        const entranceKey=document.getElementsByClassName('entrance')[0].getAttribute('key');
        AStarSolver.nextPQ.push([0,entranceKey]);

        console.log(AStarSolver.exitKey);

        AStarSolver.intervalCode=setInterval(()=>{
            const curr=AStarSolver.nextPQ.top();
            AStarSolver.nextPQ.pop();

            var currKey=curr[1];

            //release if exit is reached
            if (currKey==AStarSolver.exitKey){
                console.log("HIT");
                clearInterval(AStarSolver.intervalCode);
                return;
            }

            //early release to avoid processing nodes that are already in set
            while(AStarSolver.allSq[currKey].classList.contains('set')){
                const curr=AStarSolver.nextPQ.top();
                AStarSolver.nextPQ.pop();
                currKey=curr[1];
            }

            AStarSolver.visitedSet.add(currKey);
            AStarSolver.allSq[currKey].classList.remove('PQ');
            AStarSolver.allSq[currKey].classList.add('set');

            const nbrPos=['up','down','left','right','upLeft','upRight','downRight','downLeft'];
            for (var i=0;i<nbrPos.length;i++){
                const nbrKey=parseInt(AStarSolver.getNbrKey(currKey,nbrPos[i]),10);
                //skip nbr if its an out of bounds,obstacle or its already in visitedSet
                if (nbrKey>=AStarSolver.allSq.length){
                    console.log("ERROR: "+nbrKey);
                    continue;
                }
                if (nbrKey===-1)
                    continue;
                if (AStarSolver.allSq[nbrKey].classList.contains('obstacle'))
                    continue;
                if (AStarSolver.visitedSet.has(nbrKey))
                    continue;
                
                AStarSolver.parents[nbrKey]=currKey;
                const nbrF=AStarSolver.getFCost(nbrKey);
                AStarSolver.allSq[nbrKey].classList.add('PQ');
                AStarSolver.nextPQ.push([nbrF,nbrKey]);

                if (nbrKey==AStarSolver.exitKey){
                    console.log('HIT');
                    clearInterval(AStarSolver.intervalCode);
                    return;
                }

            }

        },10)



    }
}

export default AStarSolver