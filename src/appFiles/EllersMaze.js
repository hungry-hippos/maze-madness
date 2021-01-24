import React, { useEffect,useState } from 'react'
import ellersGeneration from './ellersGeneration'
import './Maze.css'


const EllersMaze=(props)=>{
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
        ellersGeneration.createMaze(difficulty);
        
    },[])
    return <React.Fragment>
        <div id={mazeId}>
        </div>
    </React.Fragment>
}

export default EllersMaze