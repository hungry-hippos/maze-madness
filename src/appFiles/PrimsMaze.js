import React, { useEffect } from 'react'
import primsGeneration from './primsGeneration'

const PrimsMaze=(props)=>{
    const {difficulty}=props;

    var mazeId="";
    switch(difficulty){
        case "easy":
            mazeId='easyMaze';
            break;
        case 'medium':
            mazeId='mediumMaze';
            break;
        case 'hard':
            mazeId='hardMaze';
            break;
        default:
            break;
    }

    useEffect(()=>{
        primsGeneration.createMaze(difficulty);
        
    },[])
    return <React.Fragment>
        <div id={mazeId}>
        </div>
    </React.Fragment>
}

export default PrimsMaze


