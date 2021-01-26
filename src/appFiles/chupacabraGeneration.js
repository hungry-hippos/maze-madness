

const chupacabraGeneration={
    allSq:[],
    intervalCode:0,
    stack:[],
    cols:0,
    rows:0,

    //initialized allSq and isVisited arrays
    populateMaze(difficulty){
        var numOfSquares=0;
        var sqId="";
        var mazeId="";
        var cols=0;
        switch(difficulty){
            case "easy":
                numOfSquares=64;
                sqId="easySquare";
                mazeId="easyMaze";
                cols=8;
                break;
            case "medium":
                numOfSquares=300;
                sqId="mediumSquare";
                mazeId="mediumMaze";
                cols=20;
                break;
            case "hard":
                numOfSquares=1344;
                sqId="hardSquare";
                mazeId="hardMaze";
                cols=56;
                break;
            default:
                break;
        }

        const rows=numOfSquares/cols;
        chupacabraGeneration.rows=rows;
        chupacabraGeneration.cols=cols;
        var id=0;
        for (var i=0;i<rows;i++){
            var row=[];
            for (var j=0;j<cols;j++){
                const sq=document.createElement('div');
                sq.classList.add(sqId);
                sq.classList.add('visited');
                if (i===0){
                    sq.classList.add('top');
                }
                if (i===rows-1){
                    sq.classList.add('bottom');
                }
                if (j===0){
                    sq.classList.add('left');
                }
                if (j===cols-1){
                    sq.classList.add('right');
                }
                sq.setAttribute('key',id);
                id++;
                document.getElementById(mazeId).appendChild(sq);  
                row.push(sq);
            }
            chupacabraGeneration.allSq.push(row);
        }
    },
    buildVerticalWall(TRRow,BRRow, TRCol){

        //pick a random row in TRRow<=range<=BRRow to skip
        const height=BRRow-TRRow+1;
        const rowToSkip=Math.floor(Math.random()*(height-1))+TRRow;

        while(TRRow<=BRRow){
            if (TRRow===rowToSkip){
                TRRow++;
                continue;
            }

            chupacabraGeneration.allSq[TRRow][TRCol].classList.add('right');
            chupacabraGeneration.allSq[TRRow][TRCol+1].classList.add('left');
            TRRow++;
        }
    },
    buildHorizontalWall(BLCol,BRCol,BLRow){
        //pick a random row in TRRow<=range<=BRRow to skip
        const width=BRCol-BLCol+1;
        const colToSkip=Math.floor(Math.random()*(width-1))+BLCol;

        while(BLCol<=BRCol){
            if (BLCol===colToSkip){
                BLCol++;
                continue;
            }

            chupacabraGeneration.allSq[BLRow][BLCol].classList.add('bottom');
            chupacabraGeneration.allSq[BLRow+1][BLCol].classList.add('top');
            BLCol++;
        }
    },
    stackMazeGenerator(){

        chupacabraGeneration.stack.push([0,0,chupacabraGeneration.rows,chupacabraGeneration.cols]);

        //find timeInterval expressions for my allSq.size

        chupacabraGeneration.intervalCode=setInterval(()=>{
            if (chupacabraGeneration.stack.length===0){
                clearInterval(chupacabraGeneration.intervalCode);
                return;
            }
            const curr=chupacabraGeneration.stack.pop();
            const TLRow=curr[0];
            const TLCol=curr[1];
            const height=curr[2];
            const width=curr[3];

            const direction=(height>width)?"horizontal":"vertical";
            if (direction==="vertical"){
                const TRCol=Math.floor(Math.random()*(width-2))+TLCol;
                const TRRow=TLRow;
                const BRCol=TRCol;
                const BRRow=TLRow+height-1;

                chupacabraGeneration.buildVerticalWall(TRRow,BRRow,TRCol);

                const leftWidth=TRCol-TLCol+1;
                const rightWidth=width-(TRCol-TLCol+1);
                if (leftWidth>1){
                    chupacabraGeneration.stack.push([TLRow,TLCol,height,leftWidth]);
                }
                if (rightWidth>1){
                    chupacabraGeneration.stack.push([TRRow,TRCol+1,height,rightWidth]);
                }
            }
            if (direction==="horizontal"){
                const BLCol=TLCol;
                const BLRow=Math.floor(Math.random()*(height-2))+TLRow;
                const BRCol=TLCol+width-1;
                const BRRow=BLRow;

                chupacabraGeneration.buildHorizontalWall(BLCol,BRCol,BLRow);

                const topHeight=BLRow-TLRow+1;
                const btmHeight=height-(BLRow-TLRow+1);
                if (topHeight>1){
                    chupacabraGeneration.stack.push([TLRow,TLCol,topHeight,width]);
                }
                if (btmHeight>1){
                    chupacabraGeneration.stack.push([BLRow+1,BLCol,btmHeight,width]);
                }
            }
            

        },50)
    },
    createMaze(difficulty){
        chupacabraGeneration.populateMaze(difficulty);
        chupacabraGeneration.stackMazeGenerator();
    }
}

export default chupacabraGeneration