import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import './Navbar.css'


const Navbar=()=>{

    useEffect(()=>{
        //hovering effects on pickMaze/makeYourOwn btns
        document.getElementById('pickMaze').addEventListener('mouseenter',()=>{
            document.getElementById('leftDullScreen').classList.add('hidden');
            document.getElementById('rightDullScreen').classList.remove('hidden');
        })
        document.getElementById('makeYourOwn').addEventListener('mouseenter',()=>{
            document.getElementById('leftDullScreen').classList.remove('hidden');
            document.getElementById('rightDullScreen').classList.add('hidden');
        })

        //controls logic of GNERATE / BUILD WALLS sections
        document.getElementById('mazeMenu').addEventListener('change',()=>{
            document.getElementById('makeYourOwnCheckbox').checked=false;
            document.getElementById('secondNavbarSectionGenerate').classList.remove('hidden');
            document.getElementById('buildWalls').classList.add('hidden');
            document.getElementById('thirdNavbarSection').classList.add('hidden');
            document.getElementById('fourthNavbarSection').classList.add('hidden');
        })
        document.getElementById('makeYourOwnCheckbox').addEventListener('click',()=>{
            document.getElementById('mazeMenu').selectedIndex=0;

            document.getElementById('secondNavbarSectionGenerate').classList.add('hidden');
            document.getElementById('buildWalls').classList.remove('hidden');
            document.getElementById('thirdNavbarSection').classList.remove('hidden');
            document.getElementById('fourthNavbarSection').classList.remove('hidden');

            document.getElementById('sidebarCleanSlate').click();
        })
        document.getElementById('generateBtn').addEventListener('click',()=>{
            document.getElementById('thirdNavbarSection').classList.remove('hidden');
            document.getElementById('fourthNavbarSection').classList.remove('hidden');
        })

        //clicking on a buildWall/setEntrance/setExit btn fully colors it and unselects other btns
        const setBtn=document.getElementsByClassName('setBtn');
        setBtn[0].addEventListener('click',(event)=>{
            unselectAllSetBtns();
            event.target.classList.add('blackBtn');
        })
        setBtn[1].addEventListener('click',(event)=>{
            unselectAllSetBtns();
            event.target.classList.add('greenBtn');
        })
        setBtn[2].addEventListener('click',(event)=>{
            unselectAllSetBtns();
            event.target.classList.add('redBtn');
        })

    })

    const unselectAllSetBtns=()=>{
        const setBtn=document.getElementsByClassName('setBtn');
        setBtn[0].classList.remove('blackBtn');
        setBtn[1].classList.remove('greenBtn');
        setBtn[2].classList.remove('redBtn');
    }
    const generateMaze=()=>{
        const mazeVal=document.getElementById('mazeMenu').value;
        switch(mazeVal){
            case 'snakey':
                document.getElementById('sidebarDFS').click();
                break;
            case 'tsunami':
                document.getElementById('sidebarPrims').click();
                break;
            case 'kruskals':
                document.getElementById('sidebarKruskals').click();
                break;
            case 'curtains':
                document.getElementById('sidebarEllers').click();
                break;
            case 'chupacabra':
                document.getElementById('sidebarChupacabra').click();
                break;
            default:
                break;
        }
    }
    const buildWalls=()=>{
        document.getElementById('sidebarSetObstacle').click();
    }
    const setExit=()=>{
        document.getElementById('sidebarSetExit').click();
    }
    const setEntrance=()=>{
        document.getElementById('sidebarSetEntrance').click();
    }
    const sendIt=()=>{
        const algo=document.getElementById('algoMenu').value;
        document.getElementById(algo).click();
    }

    return <div id='navbarMain'>
        <div id='firstNavbarSection' className='navbarSection'>
            <div id='pickMaze'>
                <div className='dullSection hidden' id='leftDullScreen'></div>
                PICK A MAZE
                <select name="mazeMenu" id="mazeMenu">
                    <option value="empty"></option>
                    <option value="snakey">Anaconda</option>
                    <option value="tsunami">Tsunami</option>
                    <option value="kruskals">Ant Farm</option>
                    <option value="curtains">Curtains</option>
                    <option value="chupacabra">Chupacabra</option>
                </select>
            </div>
            <div id='makeYourOwn'>
                <div className='dullSection' id='rightDullScreen'></div>
                MAKE YOUR OWN
                <input type='checkbox' id='makeYourOwnCheckbox'></input>
            </div>
        </div>
        <div id='secondNavbarSectionGenerate' className='navbarSection hidden'>
            <Button id='generateBtn' style={{fontSize:'25px',margin:'10px 0'}} className='gridReadyBtn' onClick={generateMaze}>GENERATE</Button>
        </div>
        <div id='thirdNavbarSection' className='navbarSection hidden'>
            <div id='buildWalls' className='setSquare hidden'><Button variant='outline-dark' className='setBtn' id='buildWallsBtn' onClick={buildWalls}>BUILD WALLS clickN'drag</Button></div>
            <div id='pickEntrance' className='setSquare'><Button variant='outline-success' className='setBtn' id='setEntranceBtn' onClick={setEntrance}>PICK A STARTING POINT</Button></div>
            <div id='pickExit' className='setSquare'><Button variant='outline-danger' className='setBtn' id='setExitBtn' onClick={setExit}>PICK A FINISHING POINT</Button></div>
        </div>
        <div id='fourthNavbarSection' className='navbarSection hidden'>
            <div>
                CHOOSE AN ALGO
                <select name="algoMenu" id="algoMenu">
                    <option value="empty"></option>
                    <option value="solveDFS">Drunk Python</option>
                    <option value="solveBFS">OMG THEYRE COMING!</option>
                    <option value="solveAStar">Big Brainy A.I.</option>
                </select>
            </div>
            <Button variant='danger' id='sendItBtn' onClick={sendIt}>SEND IT</Button>
        </div>
        
    </div>
}

export default Navbar