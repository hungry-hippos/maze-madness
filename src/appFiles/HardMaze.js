import React, { useEffect,useState } from 'react'
import mazeGeneration from './mazeGeneration'
import chickenMovement from './chickenMovement'
import mazeSolver from './mazeSolver'
import './Maze.css'


const MediumMaze=()=>{

    useEffect(()=>{

        mazeGeneration.createMaze("hard");
        setTimeout(() => {
            chickenMovement.spawnChicken("hard");
            chickenMovement.loadMovementListener();
            mazeSolver.bfs("hard");
        }, 15000);
        
    },[])

    return <React.Fragment>
        <div id='hardMaze'>
        </div>
    </React.Fragment>
}

export default MediumMaze