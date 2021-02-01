import React,{useState,useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import KruskalsMaze from './appFiles/KruskalsMaze'
import DFSMaze from './appFiles/DFSMaze'
import PrimsMaze from './appFiles/PrimsMaze'
import EllersMaze from './appFiles/EllersMaze'
import ChupacabraMaze from './appFiles/ChupacabraMaze'
import CleanSlate from './appFiles/CleanSlate'
import mazeSolver from './appFiles/mazeSolver'
import AStarSolver from './appFiles/AStarSolver'
import Navbar from './appFiles/Navbar.js'

const SideMenu=(props)=>{
  
  const {difficulty,setMazeName}=props.options;

  return <div id='sideMenu' className='hidden'>
    <div className='sideMenuBtn' id='sidebarPrims' onClick={()=>{setMazeName('prims')}}>PRIMS</div>
    <div className='sideMenuBtn' id='sidebarKruskals' onClick={()=>{setMazeName('kruskals')}}>KRUSKALS</div>
    <div className='sideMenuBtn' id='sidebarDFS' onClick={()=>{setMazeName('DFS')}}>DFS</div>
    <div className='sideMenuBtn' id='sidebarEllers' onClick={()=>{setMazeName('ellers')}}>ELLERS</div>
    <div className='sideMenuBtn' id='sidebarChupacabra' onClick={()=>{setMazeName('chupacabra')}}>CHUPACABRA</div>
    <div className='sideMenuBtn' id='sidebarCleanSlate' onClick={()=>{setMazeName('cleanSlate')}}>CLEAN SLATE</div>

    <div className='sideMenuBtn' id='sidebarSetEntrance' onClick={()=>{mazeSolver.setEntrance(difficulty)}}>Set ENTRANCE</div>
    <div className='sideMenuBtn' id='sidebarSetExit' onClick={()=>{mazeSolver.setExit(difficulty)}}>Set EXIT</div>
    <div className='sideMenuBtn' id='sidebarSetObstacle' onClick={()=>{mazeSolver.setObstacle(difficulty)}}>Set OBSTACLE</div>


    <div className='sideMenuBtn' id='solveDFS' onClick={()=>{mazeSolver.dfs(difficulty)}}>Solve DFS</div>
    <div className='sideMenuBtn' id='solveBFS' onClick={()=>{mazeSolver.bfs(difficulty)}}>Solve BFS</div>
    <div className='sideMenuBtn' id='solveAStar' onClick={()=>{AStarSolver.solve(difficulty)}}>Solve A*</div>

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
      return <div id='hardMaze'></div>
  }

  
}

const ScreenResolution=(props)=>{
  const {setScreenResolution}=props.setter;

  useEffect(()=>{
    var intCode=setInterval((e)=>{
      const w=window.innerWidth, h=window.innerHeight;
      console.log(w+"   "+h);
      if (h<700 || w<1610){
        document.getElementById('windowHeight').textContent=h;
        document.getElementById('windowWidth').textContent=w;
      }else{
        clearInterval(intCode);
        setScreenResolution(false);
      }
    },500)

  })

  return <div id='screenResolutionScreen'>
    <div id='screenResolution'>
      Your screen resolution is <span id='windowHeight'></span> x <span id='windowWidth'></span>.<br/>
      For the best user experience, please zoom out.
    </div>
  </div>
}

function App() {

  const [mazeName,setMazeName]=useState('');
  const [difficulty,setDifficulty]=useState('hard');
  const [screenResolution,setScreenResolution]=useState(false);

  useEffect(()=>{
    const w=window.innerWidth, h=window.innerHeight;
    if (h<700 || w<1610){
      setScreenResolution(true);
    }else{
      setScreenResolution(false);
    }
  })

  if (screenResolution){
    return <ScreenResolution setter={{setScreenResolution}} />
  }else{
    return <React.Fragment>
      <SideMenu options={{difficulty,setDifficulty,setMazeName}}/>
      <MazeSection options={{mazeName,difficulty}}/>
      <Navbar/>
    </React.Fragment>
  }  
}

export default App;
