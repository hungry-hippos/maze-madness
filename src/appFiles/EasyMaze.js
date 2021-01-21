import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import chickenMovement from './chickenMovement'
import mazeSolver from './mazeSolver'
import './Maze.css'


const EasyMaze=()=>{

    useEffect(()=>{
        mazeGeneration.createMaze("easy");
        setTimeout(() => {
            chickenMovement.spawnChicken("easy");
            chickenMovement.loadMovementListener();
            mazeSolver.dfs("easy");
        }, 5000);
        
    },[])
    return <React.Fragment>
        <div id='easyMaze'>
        </div>
    </React.Fragment>
}

export default EasyMaze