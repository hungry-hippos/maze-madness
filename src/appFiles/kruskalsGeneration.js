

const kruskalsGeneration={
    allSq:[],
    edgeSet:{},
    edgeArray:[],
    intervalCode:0,
    parents:[],
    clean(){
        kruskalsGeneration.allSq=[];
        kruskalsGeneration.edgeSet=[];
        kruskalsGeneration.edgeArray=[];
        kruskalsGeneration.intervalCode=0;
        kruskalsGeneration.parents=[];
    },
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
            kruskalsGeneration.allSq.push(sq);
            kruskalsGeneration.parents.push(-1);
        }
    },
    getNbrKey(currKey,direction){
        const gridSize=kruskalsGeneration.allSq.length;
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
    setToArray(){
        for (let edgeString of kruskalsGeneration.edgeSet){
            var u=0,v=0;
            var isCommaFound=false;
            //parses both u->v from string in set
            for (var i=0;i<edgeString.length;i++){
        
                if (edgeString[i]===','){
                    isCommaFound=true;
                    continue;
                }

                if (!isCommaFound){
                    u=u*10+parseInt(edgeString[i],10);
                }else{
                    v=v*10+parseInt(edgeString[i],10);
                }
            }

            //creates array, inserts it at a random place in the edge array
            const edgePair=[u,v];
            kruskalsGeneration.edgeArray.push(edgePair);
            const randomPos=Math.floor(Math.random()*kruskalsGeneration.edgeArray.length*.99);
            const innerEdge=kruskalsGeneration.edgeArray[randomPos];
            kruskalsGeneration.edgeArray[randomPos]=edgePair;
            kruskalsGeneration.edgeArray[kruskalsGeneration.edgeArray.length-1]=innerEdge;
        }
    },
    getEdgeSet(){
        const gridSize=kruskalsGeneration.allSq.length;
        kruskalsGeneration.edgeSet=new Set();
        const nbrDirections=["up","down","right","left"];

        //iterates through grid, finds all possible edges, stringifies them to store them into a set
        for (var currKey=0;currKey<gridSize;currKey++){
            for (var direction=0;direction<4;direction++){
                const nbrKey=kruskalsGeneration.getNbrKey(currKey,nbrDirections[direction]);

                if (nbrKey!==-1){
                    const smaller=(currKey>nbrKey)?nbrKey:currKey;
                    const larger=(currKey>nbrKey)?currKey:nbrKey;
                    const edgePair=[smaller,larger];
                    kruskalsGeneration.edgeSet.add(edgePair.toString());
                }  
            }
        }
    },
    findParent(currKey){
        
        var keysStack=[];
        while(kruskalsGeneration.parents[currKey]!==-1){
            keysStack.push(currKey);
            currKey=kruskalsGeneration.parents[currKey];
        }
        

        const componentParent=currKey;
        while(keysStack.length>0){
            const lastKey=keysStack.pop();
            kruskalsGeneration.parents[lastKey]=componentParent;
        }

        return componentParent;
    },
    unionParents(parentA,parentB){
        kruskalsGeneration.parents[parentA]=parentB;
    },
    mergeSquares(keyA,keyB){

        const delta=keyA-keyB;
        if (delta===1){
            kruskalsGeneration.allSq[keyA].classList.remove('left');
            kruskalsGeneration.allSq[keyB].classList.remove('right');
        }else if (delta===-1){
            kruskalsGeneration.allSq[keyB].classList.remove('left');
            kruskalsGeneration.allSq[keyA].classList.remove('right');
        }else if (delta>1){
            kruskalsGeneration.allSq[keyA].classList.remove('top');
            kruskalsGeneration.allSq[keyB].classList.remove('bottom');
        }else if (delta<-1){
            kruskalsGeneration.allSq[keyA].classList.remove('bottom');
            kruskalsGeneration.allSq[keyB].classList.remove('top');
        }

        
        kruskalsGeneration.allSq[keyA].classList.add('visited');
        kruskalsGeneration.allSq[keyB].classList.add('visited');
    },
    stackRandomMazeGenerator(){
        const gridSize=kruskalsGeneration.allSq.length;
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

        kruskalsGeneration.intervalCode=setInterval(()=>{
            for (var i=0;i<7;i++){
                if (kruskalsGeneration.edgeArray.length===0){
                    clearInterval(kruskalsGeneration.intervalCode);
                    return;
                }

                const currEdge=kruskalsGeneration.edgeArray.pop();
                const u=currEdge[0], v=currEdge[1];
                const parentU=kruskalsGeneration.findParent(u);
                const parentV=kruskalsGeneration.findParent(v);

                if (parentU!==parentV){
                    kruskalsGeneration.unionParents(parentU,parentV);
                    kruskalsGeneration.mergeSquares(u,v);
                }
            }
        },timeInterval)
    },

    createMaze(difficulty){
        kruskalsGeneration.clean();
        kruskalsGeneration.populateMaze(difficulty);
        kruskalsGeneration.getEdgeSet();
        kruskalsGeneration.setToArray();
        kruskalsGeneration.stackRandomMazeGenerator();
    }
}

export default kruskalsGeneration