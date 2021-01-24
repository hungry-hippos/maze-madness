const ellersGeneration={
    allSq:[],
    intervalCode:0,
    currKey:0,
    rowSet:{},
    parents:[],

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
            ellersGeneration.allSq.push(sq);
            ellersGeneration.parents.push(-1);
        }
    },
    getNbrKey(currKey,direction){
        const gridSize=ellersGeneration.allSq.length;
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
    findParent(currKey){
        
        var keysStack=[];
        while(ellersGeneration.parents[currKey]!==-1){
            keysStack.push(currKey);
            currKey=ellersGeneration.parents[currKey];
        }
        

        const componentParent=currKey;
        while(keysStack.length>0){
            const lastKey=keysStack.pop();
            ellersGeneration.parents[lastKey]=componentParent;
        }

        return componentParent;
    },
    unionParents(parentA,parentB){
        ellersGeneration.parents[parentA]=parentB;
    },
    mergeSquares(keyA,keyB){

        const delta=keyA-keyB;
        if (delta===1){
            ellersGeneration.allSq[keyA].classList.remove('left');
            ellersGeneration.allSq[keyB].classList.remove('right');
        }else if (delta===-1){
            ellersGeneration.allSq[keyB].classList.remove('left');
            ellersGeneration.allSq[keyA].classList.remove('right');
        }else if (delta>1){
            ellersGeneration.allSq[keyA].classList.remove('top');
            ellersGeneration.allSq[keyB].classList.remove('bottom');
        }else if (delta<-1){
            ellersGeneration.allSq[keyA].classList.remove('bottom');
            ellersGeneration.allSq[keyB].classList.remove('top');
        }

        
        ellersGeneration.allSq[keyA].classList.add('visited');
        ellersGeneration.allSq[keyB].classList.add('visited');
    },
    stackRandomMazeGenerator(){
        const gridSize=ellersGeneration.allSq.length;
        var timeInterval=0;
        switch(gridSize){
            case 64:
                timeInterval=40;
                break;
            case 300:
                timeInterval=15;
                break;
            case 1344:
                timeInterval=1;
                break;
            default:
                break;
        };

        ellersGeneration.rowSet=new Set();
        ellersGeneration.intervalCode=setInterval(()=>{

            if (ellersGeneration.currKey!==0){
                document.getElementsByClassName('current')[0].classList.remove('current');
            }

            if (ellersGeneration.currKey===ellersGeneration.allSq.length){
                clearInterval(ellersGeneration.intervalCode);
                return;
            }
            
            ellersGeneration.allSq[ellersGeneration.currKey].classList.add('current');
            ellersGeneration.allSq[ellersGeneration.currKey].classList.remove('frontier');
            const rightNbrKey=ellersGeneration.getNbrKey(ellersGeneration.currKey,'right');
            const downNbrKey=ellersGeneration.getNbrKey(ellersGeneration.currKey,'down');

            //merge all components belonging to different parents in bottom row (corner case)
            if (downNbrKey===-1){
                const rightNbrKey=ellersGeneration.getNbrKey(ellersGeneration.currKey,'right');
                if (rightNbrKey!==-1){
                    const parentCurr=ellersGeneration.findParent(ellersGeneration.currKey);
                    const parentRight=ellersGeneration.findParent(rightNbrKey);
                    if (parentCurr!==parentRight){
                        ellersGeneration.unionParents(parentCurr,parentRight);
                        ellersGeneration.mergeSquares(ellersGeneration.currKey,rightNbrKey);
                    }
                }
                ellersGeneration.currKey++;
                return;
            }

            //random right merge if NOT on bottom row
            if (rightNbrKey!==-1){
                const parentCurr=ellersGeneration.findParent(ellersGeneration.currKey);
                const parentRight=ellersGeneration.findParent(rightNbrKey);
                const magic8Ball=Math.round(Math.random());
                if (parentCurr!==parentRight && magic8Ball){
                    ellersGeneration.unionParents(parentCurr,parentRight);
                    ellersGeneration.mergeSquares(ellersGeneration.currKey,rightNbrKey);
                }
            }

            //guaranteed plus random down merge
            var willMergeDown=false;
            if (downNbrKey!==-1){
                const parentCurr=ellersGeneration.findParent(ellersGeneration.currKey);
                if (!ellersGeneration.rowSet.has(parentCurr)){
                    willMergeDown=true;
                    ellersGeneration.rowSet.add(parentCurr);
                }else{
                    const magic8Ball=Math.round(Math.random());
                    willMergeDown=magic8Ball;
                }
            }
            if (willMergeDown){
                const parentCurr=ellersGeneration.findParent(ellersGeneration.currKey);
                const parentDown=ellersGeneration.findParent(downNbrKey);
                ellersGeneration.unionParents(parentDown,parentCurr);
                ellersGeneration.mergeSquares(ellersGeneration.currKey,downNbrKey);

                ellersGeneration.allSq[downNbrKey].classList.add('frontier');
            }
            
            //emptying set if on last sq on row
            if (rightNbrKey===-1){
                ellersGeneration.rowSet=new Set();
            }

            //moving currKey to next square
            ellersGeneration.currKey++;
            
        },timeInterval)
    },
    createMaze(difficulty){
        ellersGeneration.populateMaze(difficulty);
        ellersGeneration.stackRandomMazeGenerator(difficulty);
    }
}

export default ellersGeneration