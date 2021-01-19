import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import chickenMovement from './chickenMovement'
import './Maze.css'





const Maze=()=>{

    useEffect(()=>{
        mazeGeneration.createMaze();
        chickenMovement.spawnChicken();
        chickenMovement.loadMovementListener();
    },[])
    return <React.Fragment>
        <div id='maze'>
        </div>
    </React.Fragment>
}

export default Maze