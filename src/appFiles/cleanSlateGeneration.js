const cleanSlateGeneration={

    allSq:[],
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
        var id=0;
        for (var i=0;i<rows;i++){
            var row=[];
            for (var j=0;j<cols;j++){
                const sq=document.createElement('div');
                sq.classList.add(sqId);
                sq.classList.add('cleanSlateSq');
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
            cleanSlateGeneration.allSq.push(row);
        }
    },
    createMaze(difficulty){
        cleanSlateGeneration.populateMaze(difficulty);
    }
}

export default cleanSlateGeneration