import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import chickenMovement from './chickenMovement'
import './Maze.css'


const MediumMaze=()=>{

    useEffect(()=>{

        mazeGeneration.createMaze("hard");
        setTimeout(() => {
            chickenMovement.spawnChicken("hard");
            chickenMovement.loadMovementListener();
        }, 7000);
        
    },[])

    return <React.Fragment>
        <div id='hardMaze'>
        </div>
    </React.Fragment>
}

export default MediumMaze