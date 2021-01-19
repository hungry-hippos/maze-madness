

const chickenMovement={
    chickenKey:0,
    allSq:[],

    getNextKey(direction){
        const gridSize=document.getElementsByClassName('square').length;
        const currKey=chickenMovement.chickenKey;
        if (gridSize===64){            
            switch (direction){
                case 'up':
                    return (currKey<8 || chickenMovement.allSq[currKey].classList.contains('top'))?-1:currKey-8;
                case 'down':
                    return (55<currKey || chickenMovement.allSq[currKey].classList.contains('bottom'))?-1:currKey+8;
                case 'left':
                    return ((currKey%8===0) || chickenMovement.allSq[currKey].classList.contains('left'))?-1:currKey-1;
                case 'right':
                    return (((currKey+1)%8===0) || chickenMovement.allSq[currKey].classList.contains('right'))?-1:currKey+1;
                default:
                    break;
            }
        }
    },
    moveChicken(direction){
        const nextKey=chickenMovement.getNextKey(direction);
        if (nextKey!==-1){
            chickenMovement.allSq[chickenMovement.chickenKey].classList.remove('chicken');
            chickenMovement.allSq[nextKey].classList.add('chicken');
            chickenMovement.chickenKey=nextKey;
        }
    },
    spawnChicken(){
        chickenMovement.allSq=document.getElementsByClassName('square');
        chickenMovement.chickenKey=document.getElementsByClassName('entrance')[0].getAttribute('key');
        chickenMovement.allSq[chickenMovement.chickenKey].classList.add('chicken');
    },
    loadMovementListener(){
        window.addEventListener('keyup',(e)=>{
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