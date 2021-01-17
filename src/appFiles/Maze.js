import React, { useEffect,useState } from 'react'
import mazeLogic from './mazeLogic'
import './Maze.css'





const Maze=()=>{

    useEffect(()=>{
        mazeLogic.populateMaze();
        mazeLogic.pickStartingSq();
        mazeLogic.loadMovementListener();
    },[])
    return <div id='maze'>
    </div>
}

export default Maze