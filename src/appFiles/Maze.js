import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import chickenMovement from './chickenMovement'
import './Maze.css'


const Maze=()=>{

    useEffect(()=>{
        mazeGeneration.createMaze();
        setTimeout(() => {
            chickenMovement.spawnChicken();
            chickenMovement.loadMovementListener();
        }, 2000);
        
    },[])
    return <React.Fragment>
        <div id='maze'>
        </div>
    </React.Fragment>
}

export default Maze