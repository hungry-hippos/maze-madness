const mazeLogic={
    allSq:[],
    isVisited:[],

    populateMaze(){
        for (var i=0;i<64;i++){
            const sq=document.createElement('div');
            sq.classList.add('square');
            sq.classList.add('top');
            sq.classList.add('bottom');
            sq.classList.add('left');
            sq.classList.add('right');
            sq.setAttribute('key',i);
            document.getElementById('maze').appendChild(sq);
            mazeLogic.allSq.push(sq);

            mazeLogic.isVisited.push(false);
        }
    },
    pickStartingSq(){
        const num=Math.floor(Math.random()*7.99);
        mazeLogic.allSq[num].classList.add('current');
        mazeLogic.isVisited[num]=true;
        mazeLogic.allSq[num].classList.add('visited');
    },
    currentMovement(direction){
        const currKey=parseInt(document.getElementsByClassName('current')[0].getAttribute('key'),10);
        var nextKey=0;
        switch(direction){
            case 'up':
                nextKey=currKey-8;
                mazeLogic.allSq[currKey].classList.remove('top');
                mazeLogic.allSq[nextKey].classList.remove('bottom');

                mazeLogic.allSq[currKey].classList.remove('current');
                mazeLogic.allSq[nextKey].classList.add('current');
                mazeLogic.allSq[nextKey].classList.add('visited');
                break;
            case 'down':
                nextKey=currKey+8;
                mazeLogic.allSq[currKey].classList.remove('bottom');
                mazeLogic.allSq[nextKey].classList.remove('top');

                mazeLogic.allSq[currKey].classList.remove('current');
                mazeLogic.allSq[nextKey].classList.add('current');
                mazeLogic.allSq[nextKey].classList.add('visited');
                break;
            case 'left':
                nextKey=currKey-1;
                mazeLogic.allSq[currKey].classList.remove('left');
                mazeLogic.allSq[nextKey].classList.remove('right');

                mazeLogic.allSq[currKey].classList.remove('current');
                mazeLogic.allSq[nextKey].classList.add('current');
                mazeLogic.allSq[nextKey].classList.add('visited');
                break;
            case 'right':
                nextKey=currKey+1;
                mazeLogic.allSq[currKey].classList.remove('right');
                mazeLogic.allSq[nextKey].classList.remove('left');

                mazeLogic.allSq[currKey].classList.remove('current');
                mazeLogic.allSq[nextKey].classList.add('current');
                mazeLogic.allSq[nextKey].classList.add('visited');
                break;

            default:
                break;
        }
    },
    loadMovementListener(){
        window.addEventListener('keydown',(e)=>{
            e.preventDefault();
            switch(e.code){
                case 'ArrowDown':
                    mazeLogic.currentMovement('down');
                    break;
                case 'ArrowUp':
                    mazeLogic.currentMovement('up');
                    break;
                case 'ArrowRight':
                    mazeLogic.currentMovement('right');
                    break;
                case 'ArrowLeft':
                    mazeLogic.currentMovement('left');
                    break;
                case 'KeyD':
                    mazeLogic.randomMazeGenerator();
                    break;
                default:
                    break;
            }
        })
    },
    getInGrid(currKey,direction){
        const gridSize=mazeLogic.isVisited.length;
        if (gridSize===64){
            if (currKey<8 && direction==="up"){
                return false;
            }
            if (55<currKey && direction==="down"){
                return false;
            }
            if ((currKey%8)===0 && direction==="left"){
                return false;
            }
            if ((currKey+1)%8===0 && direction==="right"){
                return false;
            } 
            return true;
        }
    },
    randomMazeGenerator(){
        //store current position
        const currKey=parseInt(document.getElementsByClassName('current')[0].getAttribute('key'),10);

        //shuffle all poss nbrs
        var nbrPositions=[["up",-8],["down",8],["left",-1],["right",1]];
        nbrPositions.sort(()=>Math.random()-.5);

        //recurse into each nbr
        for (var i=0;i<4;i++){

            const direction=nbrPositions[i][0];
            const inGrid=mazeLogic.getInGrid(currKey,direction);

            const delta=nbrPositions[i][1];
            const nextKey=currKey+delta;

            if (inGrid && !mazeLogic.isVisited[nextKey]){
                mazeLogic.currentMovement(direction);
                mazeLogic.isVisited[nextKey]=true;
                mazeLogic.randomMazeGenerator();
            }
        }
    }
}

export default mazeLogic