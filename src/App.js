import React,{useState,useEffect} from 'react'
import './App.css';
import KruskalsMaze from './appFiles/KruskalsMaze'
import DFSMaze from './appFiles/DFSMaze'
import PrimsMaze from './appFiles/PrimsMaze'
import EllersMaze from './appFiles/EllersMaze'
import ChupacabraMaze from './appFiles/ChupacabraMaze'
import CleanSlate from './appFiles/CleanSlate'
import mazeSolver from './appFiles/mazeSolver'
import priorityQueue from './appFiles/priorityQueue'

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

    <div className='sideMenuBtn' onClick={()=>{mazeSolver.dfs(difficulty)}}>Solve DFS</div>
    <div className='sideMenuBtn' onClick={()=>{mazeSolver.bfs(difficulty)}}>Solve BFS</div>
    <div className='sideMenuBtn' onClick={()=>{mazeSolver.AStar(difficulty)}}>Solve A*</div>



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
  const [difficulty,setDifficulty]=useState('easy');

  useEffect(()=>{
    var PQ=new priorityQueue();
    PQ.push([5,'dog']);
    PQ.push([3,'ddra']);
    PQ.push([12,'sd']);
    
    PQ.push([1200,'sssss']);
    PQ.push([56,'me']);
    PQ.push([2,'pop']);
    PQ.push([1,'s']);
    PQ.pop();
    PQ.pop();
    PQ.pop();
    console.log(PQ.arr);


  })
  
  return <React.Fragment>
    <SideMenu options={{difficulty,setDifficulty,setMazeName}}/>
    <MazeSection options={{mazeName,difficulty}}/>
  </React.Fragment>
  
}

export default App;
