import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import './Maze.css'

const DFSMaze=(props)=>{
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
        mazeGeneration.createMaze(difficulty);
        
    },[])
    return <React.Fragment>
        <div id={mazeId}>
        </div>
    </React.Fragment>
}

export default DFSMaze