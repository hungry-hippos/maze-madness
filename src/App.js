import React,{useState,useEffect} from 'react'
import './App.css';
import KruskalsMaze from './appFiles/KruskalsMaze'
import DFSMaze from './appFiles/DFSMaze'
import PrimsMaze from './appFiles/PrimsMaze'
import EllersMaze from './appFiles/EllersMaze'
import ChupacabraMaze from './appFiles/ChupacabraMaze'
import CleanSlate from './appFiles/CleanSlate'
import mazeSolver from './appFiles/mazeSolver'
import AStarSolver from './appFiles/AStarSolver'

const SideMenu=(props)=>{
  
  const {difficulty,setDifficulty,setMazeName}=props.options;

  return <div id='sideMenu'>
    <div className='sideMenuBtn' onClick={()=>{setMazeName('prims')}}>PRIMS</div>
    <div className='sideMenuBtn' onClick={()=>{setMazeName('kruskals')}}>KRUSKALS</div>
    <div className='sideMenuBtn' onClick={()=>{setMazeName('DFS')}}>DFS</div>
    <div className='sideMenuBtn' onClick={()=>{setMazeName('ellers')}}>ELLERS</div>
    <div className='sideMenuBtn' onClick={()=>{setMazeName('chupacabra')}}>CHUPACABRA</div>
    <div className='sideMenuBtn' onClick={()=>{setMazeName('cleanSlate')}}>CLEAN SLATE</div>

    <div className='sideMenuBtn' onClick={()=>{setDifficulty('easy')}}>easy</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('medium')}}>medium</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('hard')}}>hard</div>

    <div className='sideMenuBtn' onClick={()=>{mazeSolver.setEntrance(difficulty)}}>Set ENTRANCE</div>
    <div className='sideMenuBtn' onClick={()=>{mazeSolver.setExit(difficulty)}}>Set EXIT</div>
    <div className='sideMenuBtn' onClick={()=>{mazeSolver.setObstacle(difficulty)}}>Set OBSTACLE</div>


    <div className='sideMenuBtn' onClick={()=>{mazeSolver.dfs(difficulty)}}>Solve DFS</div>
    <div className='sideMenuBtn' onClick={()=>{mazeSolver.bfs(difficulty)}}>Solve BFS</div>
    <div className='sideMenuBtn' onClick={()=>{AStarSolver.solve(difficulty)}}>Solve A*</div>



  </div>

};
const MazeSection=(props)=>{
  const {difficulty,mazeName}=props.options;

  switch (mazeName){
    case 'DFS':
      return <DFSMaze difficulty={difficulty} />
    case 'kruskals':
      return <KruskalsMaze difficulty={difficulty} />
    case 'prims':
      return <PrimsMaze difficulty={difficulty} />
    case 'ellers':
      return <EllersMaze difficulty={difficulty} />
    case 'chupacabra':
      return <ChupacabraMaze difficulty={difficulty} />
    case 'cleanSlate':
      return <CleanSlate difficulty={difficulty} />
    default:
      return <React.Fragment />
  }

  
}

function App() {

  const [mazeName,setMazeName]=useState('');
  const [difficulty,setDifficulty]=useState('hard');
  
  return <React.Fragment>
    <SideMenu options={{difficulty,setDifficulty,setMazeName}}/>
    <MazeSection options={{mazeName,difficulty}}/>
  </React.Fragment>
  
}

export default App;
