import React,{useState,useEffect} from 'react'
import './App.css';
import KruskalsMaze from './appFiles/KruskalsMaze'
import DFSMaze from './appFiles/DFSMaze'
import PrimsMaze from './appFiles/PrimsMaze'
import EllersMaze from './appFiles/EllersMaze'
import mazeSolver from './appFiles/mazeSolver'

const SideMenu=(props)=>{
  
  const {setShowDFS,setShowPrims,setShowKruskals,setShowEllers}= props.mazeOptions;
  const {difficulty,setDifficulty}=props.difficulty;
  const changeMaze=(mazeName)=>{
    setShowDFS(false);
    setShowKruskals(false);
    setShowPrims(false);
    setShowEllers(false);

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

  function toggleHoverEntrance(event){
    event.target.classList.toggle('hoverEntrance');
  }
  function pickEntrance(event){
    const prevEntrance=document.getElementsByClassName('entrance');
    if (prevEntrance.length!==0){
      prevEntrance[0].classList.remove('entrance');
    }
    event.target.classList.add('entrance');
  }
  function toggleHoverExit(event){
    event.target.classList.toggle('hoverExit');
  }
  function pickExit(event){
    const prevExit=document.getElementsByClassName('exit');
    if (prevExit.length!==0){
      prevExit[0].classList.remove('exit');
    }
    event.target.classList.add('exit');
  }
  const setEntrance=()=>{
    var sqId="";
    switch(difficulty){
        case "easy":
            sqId="easySquare";
            break;
        case "medium":
            sqId="mediumSquare";
            break;
        case "hard":
            sqId="hardSquare";
            break;
        default:
            break;
    }

    const allSq=document.getElementsByClassName(sqId);
    for (var i=0;i<allSq.length;i++){

      allSq[i].removeEventListener('mouseenter',toggleHoverExit);
      allSq[i].removeEventListener('mouseout',toggleHoverExit);
      allSq[i].removeEventListener('click',pickExit);

      allSq[i].addEventListener('mouseenter',toggleHoverEntrance);
      allSq[i].addEventListener('mouseout',toggleHoverEntrance);
      allSq[i].addEventListener('click',pickEntrance);
    }
  }
  const setExit=()=>{
    var sqId="";
    switch(difficulty){
        case "easy":
            sqId="easySquare";
            break;
        case "medium":
            sqId="mediumSquare";
            break;
        case "hard":
            sqId="hardSquare";
            break;
        default:
            break;
    }

    const allSq=document.getElementsByClassName(sqId);
    for (var i=0;i<allSq.length;i++){

      allSq[i].removeEventListener('mouseenter',toggleHoverEntrance);
      allSq[i].removeEventListener('mouseout',toggleHoverEntrance);
      allSq[i].removeEventListener('click',pickEntrance);

      allSq[i].addEventListener('mouseenter',toggleHoverExit);
      allSq[i].addEventListener('mouseout',toggleHoverExit);
      allSq[i].addEventListener('click',pickExit);
    }
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
    <div className='sideMenuBtn' onClick={()=>{mazeSolver.dfs(difficulty)}}>Solve DFS</div>
    <div className='sideMenuBtn' onClick={()=>{mazeSolver.bfs(difficulty)}}>Solve BFS</div>


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
    <SideMenu mazeOptions={{setShowDFS,setShowPrims,setShowKruskals,setShowEllers}} difficulty={{difficulty,setDifficulty}}/>
    <MazeSection mazes={{showDFS,showPrims,showKruskals,showEllers}} difficulty={{difficulty}}/>
  </React.Fragment>
  
  
}

export default App;
