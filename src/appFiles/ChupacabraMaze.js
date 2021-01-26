import React, { useEffect,useState } from 'react'
import chupacabraGeneration from './chupacabraGeneration'
import './Maze.css'

const ChupacabraMaze=(props)=>{
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
        chupacabraGeneration.createMaze(difficulty);
    })
    return <React.Fragment>
        <div id={mazeId}>
        </div>
    </React.Fragment>
}

export default ChupacabraMaze