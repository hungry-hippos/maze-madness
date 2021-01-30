import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import './Navbar.css'


const Navbar=()=>{

    useEffect(()=>{
        //hovering effects on pickMaze/makeYourOwn btns
        document.getElementById('pickMaze').addEventListener('mouseenter',(event)=>{
            event.target.classList.remove('dullSection');
            document.getElementById('makeYourOwn').classList.add('dullSection');
        });
        document.getElementById('makeYourOwn').addEventListener('mouseenter',(event)=>{
            event.target.classList.remove('dullSection');
            document.getElementById('pickMaze').classList.add('dullSection');
        });

        //controls logic of GNERATE / BUILD WALLS sections
        document.getElementById('mazeMenu').addEventListener('change',()=>{
            document.getElementById('makeYourOwnCheckbox').checked=false;
            document.getElementById('secondNavbarSectionGenerate').classList.remove('hidden');
            document.getElementById('secondNavbarSectionBuild').classList.add('hidden');
        })
        document.getElementById('makeYourOwnCheckbox').addEventListener('click',()=>{
            document.getElementById('mazeMenu').selectedIndex=0;
            document.getElementById('secondNavbarSectionGenerate').classList.add('hidden');
            document.getElementById('secondNavbarSectionBuild').classList.remove('hidden');
            document.getElementById('sidebarCleanSlate').click();
            document.getElementById('sidebarSetObstacle').click();
        })

        //unveils SELECT ENTRACE/EXIT
        const gridReadyBtns=document.getElementsByClassName('gridReadyBtn');
        for (var i=0;i<2;i++){
            gridReadyBtns[i].addEventListener('click',()=>{
                document.getElementById('thirdNavbarSection').classList.remove('hidden');
            })
        }
    })

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

    return <div id='navbarMain'>
        <div id='firstNavbarSection' className='navbarSection'>
            <div id='pickMaze' className='dullSection'>
                PICK A MAZE
                <select name="mazeMenu" id="mazeMenu">
                    <option value="empty"></option>
                    <option value="snakey">Snakey</option>
                    <option value="tsunami">Tsunami</option>
                    <option value="kruskals">Kruskals</option>
                    <option value="curtains">Curtains</option>
                    <option value="chupacabra">Chupacabra</option>
                </select>
            </div>
            <div id='makeYourOwn' className='dullSection'>
                MAKE YOUR OWN
                <input type='checkbox' id='makeYourOwnCheckbox'></input>
            </div>
        </div>
        <div id='secondNavbarSectionGenerate' className='navbarSection hidden'>
            <Button style={{fontSize:'25px',margin:'10px 0'}} className='gridReadyBtn' onClick={generateMaze}>GENERATE</Button>
        </div>
        <div id='secondNavbarSectionBuild' className='navbarSection hidden'>
            CLICK N' DRAG TO BUILD WALLS
            <Button style={{display:'block',margin:'5px auto',fontSize:'20px',padding:'5px 15px'}} className='gridReadyBtn'>DONE</Button>
        </div>
        <div id='thirdNavbarSection' className='navbarSection hidden'>
            <div id='pickEntrance' className='setSquare'>PICK A STARTING POINT</div>
            <div id='pickExit' className='setSquare'>PICK A FINISHING POINT</div>
        </div>
        <div id='fourthNavbarSection' className='navbarSection hidden'>
            CHOOSE AN ALGO
            <select name="algoMenu" id="algoMenu">
                <option value="empty"></option>
                <option value="drunkPython">Drunk Python</option>
                <option value="coming">THEYRE COMING!</option>
                <option value="predator">Predator</option>
            </select>
        </div>
        <div id='fifthNavbarSection' className='navbarSection hidden'>
            <Button variant='dark' id='sendItBtn'>SEND IT</Button>
        </div>
    </div>
}

export default Navbar