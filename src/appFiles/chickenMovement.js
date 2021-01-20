

const chickenMovement={
    chickenKey:0,
    allSq:[],

    getNextKey(direction){
        const gridSize=chickenMovement.allSq.length;
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


        const currKey=parseInt(chickenMovement.chickenKey,10);     
        switch (direction){
            case 'up':
                return (chickenMovement.allSq[currKey].classList.contains('top'))?-1:currKey-rowSize;
            case 'down':
                return (chickenMovement.allSq[currKey].classList.contains('bottom'))?-1:currKey+rowSize;
            case 'left':
                return (chickenMovement.allSq[currKey].classList.contains('left'))?-1:currKey-1;
            case 'right':
                return (chickenMovement.allSq[currKey].classList.contains('right'))?-1:currKey+1;
            default:
                break;
        }
    },
    moveChicken(direction){
        const nextKey=parseInt(chickenMovement.getNextKey(direction),10);
        if (nextKey!==-1){
            chickenMovement.allSq[chickenMovement.chickenKey].classList.remove('chicken');
            chickenMovement.allSq[nextKey].classList.add('chicken');
            chickenMovement.chickenKey=nextKey;
        }
    },
    spawnChicken(difficulty){
        var sqId="";
        switch(difficulty){
            case "easy":
                sqId='easySquare';
                break;
            case "medium":
                sqId='mediumSquare';
                break;
            case "hard":
                sqId='hardSquare';
                break;
            default:
                break;
        }
        chickenMovement.allSq=document.getElementsByClassName(sqId);
        chickenMovement.chickenKey=parseInt(document.getElementsByClassName('entrance')[0].getAttribute('key'),10);
        chickenMovement.allSq[chickenMovement.chickenKey].classList.add('chicken');
    },
    loadMovementListener(){
        window.addEventListener('keydown',(e)=>{
            e.preventDefault();
            switch(e.code){
                case 'ArrowDown':
                    chickenMovement.moveChicken('down');
                    break;
                case 'ArrowUp':
                    chickenMovement.moveChicken('up');
                    break;
                case 'ArrowRight':
                    chickenMovement.moveChicken('right');
                    break;
                case 'ArrowLeft':
                    chickenMovement.moveChicken('left');
                    break;
                default:
                    break;
            }
        })
    },
}

export default chickenMovement