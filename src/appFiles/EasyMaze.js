import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import chickenMovement from './chickenMovement'
import './Maze.css'


const EasyMaze=()=>{

    useEffect(()=>{
        mazeGeneration.createMaze("easy");
        setTimeout(() => {
            chickenMovement.spawnChicken("easy");
            chickenMovement.loadMovementListener();
        }, 2000);
        
    },[])
    return <React.Fragment>
        <div id='easyMaze'>
        </div>
    </React.Fragment>
}

export default EasyMaze