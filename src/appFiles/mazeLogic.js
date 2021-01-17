const mazeLogic={
    allSq:[],

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
        }
    },
    pickStartingSq(){
        const num=Math.floor(Math.random()*7.99);
        mazeLogic.allSq[num].classList.add('current');
    },
    currentMovement(direction){
        const currKey=parseInt(document.getElementsByClassName('current')[0].getAttribute('key'),10);
        var nextKey=0;
        switch(direction){
            case 'up':
                nextKey=currKey-8;
                if (nextKey>=0){
                    this.allSq[currKey].classList.remove('top');
                    this.allSq[nextKey].classList.remove('bottom');

                    this.allSq[currKey].classList.remove('current');
                    this.allSq[nextKey].classList.add('current');
                }
                break;
            case 'down':
                nextKey=currKey+8;
                if (nextKey<64){
                    this.allSq[currKey].classList.remove('bottom');
                    this.allSq[nextKey].classList.remove('top');

                    this.allSq[currKey].classList.remove('current');
                    this.allSq[nextKey].classList.add('current');
                }
                break;
            case 'left':
                nextKey=currKey-1;
                if (currKey%8!==0){
                    this.allSq[currKey].classList.remove('left');
                    this.allSq[nextKey].classList.remove('right');

                    this.allSq[currKey].classList.remove('current');
                    this.allSq[nextKey].classList.add('current');
                }
                break;
                case 'right':
                    nextKey=currKey+1;
                    if (nextKey%8!==0){
                        this.allSq[currKey].classList.remove('right');
                        this.allSq[nextKey].classList.remove('left');
    
                        this.allSq[currKey].classList.remove('current');
                        this.allSq[nextKey].classList.add('current');
                    }
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
                default:
                    break;
            }
        })
    }
}

export default mazeLogic