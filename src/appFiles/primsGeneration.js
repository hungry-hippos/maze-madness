const primsGeneration={
    allSq:[],
    intervalCode:0,
    frontierSet:[],

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
            primsGeneration.allSq.push(sq);
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
        primsGeneration.allSq[num].classList.add('visited');
        primsGeneration.allSq[num].classList.add('current');

        const nbrDirections=['up','down','left','right']
        for (var i=0;i<4;i++){
            const nbrKey=primsGeneration.getNbrKey(num,nbrDirections[i]);
            if (nbrKey!==-1){
                primsGeneration.allSq[nbrKey].classList.add('frontier');
                primsGeneration.frontierSet.push(nbrKey);
            }
        }
    },
    getNbrKey(currKey,direction){
        const gridSize=primsGeneration.allSq.length;
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
    mergeSquares(frontierKey,visitedKey){

        const delta=frontierKey-visitedKey;
        if (delta===1){
            primsGeneration.allSq[frontierKey].classList.remove('left');
            primsGeneration.allSq[visitedKey].classList.remove('right');
        }else if (delta===-1){
            primsGeneration.allSq[visitedKey].classList.remove('left');
            primsGeneration.allSq[frontierKey].classList.remove('right');
        }else if (delta>1){
            primsGeneration.allSq[frontierKey].classList.remove('top');
            primsGeneration.allSq[visitedKey].classList.remove('bottom');
        }else if (delta<-1){
            primsGeneration.allSq[frontierKey].classList.remove('bottom');
            primsGeneration.allSq[visitedKey].classList.remove('top');
        }
        primsGeneration.allSq[frontierKey].classList.remove('frontier');
        primsGeneration.allSq[visitedKey].classList.remove('visitedKey');
    },
    shuffleLastFrontierElement(){
        const num=Math.floor(Math.random()*primsGeneration.frontierSet.length*.99);
        const temp=primsGeneration.frontierSet[num];
        primsGeneration.frontierSet[num]=primsGeneration.frontierSet[primsGeneration.frontierSet.length-1];
        primsGeneration.frontierSet[primsGeneration.frontierSet.length-1]=temp;
    },
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

        primsGeneration.intervalCode=setInterval(()=>{

            document.getElementsByClassName('current')[0].classList.remove('current');

            if (primsGeneration.frontierSet.length===0){
                clearInterval(primsGeneration.intervalCode);
                return;
            }

            primsGeneration.shuffleLastFrontierElement();
            const currFrontierPos=primsGeneration.frontierSet.pop();
            primsGeneration.allSq[currFrontierPos].classList.add('current');           

            nbrPositions.sort(()=>Math.random()-.5);
            var needsToMerge=true;
            for (var i=0;i<4;i++){
                const nbrKey=primsGeneration.getNbrKey(currFrontierPos,nbrPositions[i]);
                if (nbrKey===-1)
                    continue;

                if (needsToMerge && primsGeneration.allSq[nbrKey].classList.contains('visited')){
                    primsGeneration.mergeSquares(currFrontierPos,nbrKey);
                    primsGeneration.allSq[currFrontierPos].classList.add('visited');
                    needsToMerge=false;
                }
                if (!primsGeneration.allSq[nbrKey].classList.contains('visited') && !primsGeneration.allSq[nbrKey].classList.contains('frontier')){
                    primsGeneration.allSq[nbrKey].classList.add('frontier');
                    primsGeneration.frontierSet.push(nbrKey);
                }
            }
        },timeInterval)
    },
    createMaze(difficulty){
        primsGeneration.populateMaze(difficulty);
        primsGeneration.pickStartingSq(difficulty);
        primsGeneration.stackRandomMazeGenerator(difficulty);
    }
}

export default primsGeneration