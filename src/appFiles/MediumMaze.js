import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import chickenMovement from './chickenMovement'
import './Maze.css'


const MediumMaze=()=>{

    useEffect(()=>{
        mazeGeneration.createMaze("medium");
        setTimeout(() => {
            chickenMovement.spawnChicken("medium");
            chickenMovement.loadMovementListener();
        }, 7000);
        
    },[])
    return <React.Fragment>
        <div id='mediumMaze'>
        </div>
    </React.Fragment>
}

export default MediumMaze