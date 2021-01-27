import React, { useEffect } from 'react'
import cleanSlateGeneration from './cleanSlateGeneration'
import './Maze.css'

const CleanSlate=(props)=>{
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
        cleanSlateGeneration.createMaze(difficulty);
    })
    return <React.Fragment>
        <div id={mazeId}>
        </div>
    </React.Fragment>
}

export default CleanSlate