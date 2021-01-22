import React, { useEffect } from 'react'
import primsGeneration from './primsGeneration'
import mazeSolver from './mazeSolver'

const HardPrims=()=>{

    useEffect(()=>{
        primsGeneration.populateMaze("hard");
        primsGeneration.pickStartingSq('hard');
        primsGeneration.pickExitSq("hard");
        
        primsGeneration.stackRandomMazeGenerator('hard');

        setTimeout(() => {
            mazeSolver.dfs("hard");
        }, 15000);
    },[])
    return <div id='hardMaze'>
    </div>
}

export default HardPrims