import React, { useEffect } from 'react'
import kruskalsGeneration from './kruskalsGeneration'
import './Maze.css'


const KruskalsMaze=(props)=>{
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
        kruskalsGeneration.createMaze(difficulty);
        
    },[])
    return <React.Fragment>
        <div id={mazeId}>
        </div>
    </React.Fragment>
}

export default KruskalsMaze