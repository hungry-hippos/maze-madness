import React,{useState,useEffect} from 'react'
import './App.css';
import KruskalsMaze from './appFiles/KruskalsMaze'
import DFSMaze from './appFiles/DFSMaze'
import PrimsMaze from './appFiles/PrimsMaze'
import EllersMaze from './appFiles/EllersMaze'

const SideMenu=(props)=>{
  
  const {setShowDFS,setShowPrims,setShowKruskals,setShowEllers}= props.mazeOptions;
  const {setDifficulty}=props.setDifficulty;
  const changeMaze=(mazeName)=>{
    setShowDFS(false);
    setShowKruskals(false);
    setShowPrims(false);
    setShowEllers(true);

    switch(mazeName){
      case "prims":
        setShowPrims(true);
        break;
      case "kruskals":
        setShowKruskals(true);
        break;
      case 'DFS':
        setShowDFS(true);
        break;
      case "ellers":
        setShowEllers(true);
        break;
      default:
        break;
    }
  }

  const setEntrance=()=>{
    var sqId="";

  }
  const setExit=()=>{
    console.log('exit');
  }
  return <div id='sideMenu'>
    <div className='sideMenuBtn' onClick={()=>{changeMaze('prims')}}>PRIMS</div>
    <div className='sideMenuBtn' onClick={()=>{changeMaze('kruskals')}}>KRUSKALS</div>
    <div className='sideMenuBtn' onClick={()=>{changeMaze('DFS')}}>DFS</div>
    <div className='sideMenuBtn' onClick={()=>{changeMaze('ellers')}}>ELLERS</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('easy')}}>easy</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('medium')}}>medium</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('hard')}}>hard</div>
    <div className='sideMenuBtn' onClick={setEntrance}>Set ENTRANCE</div>
    <div className='sideMenuBtn' onClick={setExit}>Set EXIT</div>


  </div>

};
const MazeSection=(props)=>{
  const {showDFS,showPrims,showKruskals,showEllers}=props.mazes;
  const {difficulty}=props.difficulty;

  if (showDFS){
    return <DFSMaze difficulty={difficulty}/>
  }else if (showPrims){
    return <PrimsMaze difficulty={difficulty} />
  }else if (showKruskals){
    return <KruskalsMaze difficulty={difficulty} />
  }else if (showEllers){
    return <EllersMaze difficulty={difficulty} />
  }else{
    return <React.Fragment/>
  }
}

function App() {

  const [showDFS,setShowDFS]=useState(false);
  const [showPrims,setShowPrims]=useState(false);
  const [showKruskals,setShowKruskals]=useState(false);
  const [showEllers,setShowEllers]=useState(false);
  const [difficulty,setDifficulty]=useState('easy');
  
  return <React.Fragment>
    <SideMenu mazeOptions={{setShowDFS,setShowPrims,setShowKruskals,setShowEllers}} setDifficulty={{setDifficulty}}/>
    <MazeSection mazes={{showDFS,showPrims,showKruskals,showEllers}} difficulty={{difficulty}}/>
  </React.Fragment>
  
  
}

export default App;
