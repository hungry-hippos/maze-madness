import React,{useState,useEffect} from 'react'
import './App.css';
import KruskalsMaze from './appFiles/KruskalsMaze'
import DFSMaze from './appFiles/DFSMaze'
import PrimsMaze from './appFiles/PrimsMaze'

const SideMenu=(props)=>{
  
  const {setShowDFS,setShowPrims,setShowKruskals}= props.mazeOptions;
  const {setDifficulty}=props.setDifficulty;
  const changeMaze=(mazeName)=>{
    setShowDFS(false);
    setShowKruskals(false);
    setShowPrims(false);

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
      default:
        break;
    }
  }

  return <div id='sideMenu'>
    <div className='sideMenuBtn' onClick={()=>{changeMaze('prims')}}>PRIMS</div>
    <div className='sideMenuBtn' onClick={()=>{changeMaze('kruskals')}}>KRUSKALS</div>
    <div className='sideMenuBtn' onClick={()=>{changeMaze('DFS')}}>DFS</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('easy')}}>easy</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('medium')}}>medium</div>
    <div className='sideMenuBtn' onClick={()=>{setDifficulty('hard')}}>hard</div>
  </div>

};

function App() {

  const [showDFS,setShowDFS]=useState(false);
  const [showPrims,setShowPrims]=useState(false);
  const [showKruskals,setShowKruskals]=useState(false);
  const [loading,setLoading]=useState(false);
  const [difficulty,setDifficulty]=useState('easy');

  
  return <React.Fragment>
    <SideMenu mazeOptions={{setShowDFS,setShowPrims,setShowKruskals}} setDifficulty={{setDifficulty}}/>
    { showDFS && <DFSMaze difficulty={difficulty}/>}
    { showPrims && <PrimsMaze difficulty={difficulty} />}
    { showKruskals && <KruskalsMaze difficulty={difficulty} />}
    { loading && < div>LOADING</div>}
  </React.Fragment>
  
  
}

export default App;
