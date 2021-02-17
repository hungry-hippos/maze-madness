<h1>Welcome to Maze Maker!</h1>

Of all the useless projects I've created, this one tops the list on complexity. I'd been leetcoding for a while and learning about graph theory. One day I woke up feeling algorithmiky, so I came up with this. <br/><br/>
The stack used includes HTML/CSS/JS and React. All logic was coded in JS, which was more difficult than I anticipated having done all my leetcode/algo practice on C++. I guess there's a reason they dont use loosely-typed languages for algorithms and data processing. <br/>
I wish I could say all the algorithms utilized were a personal creation, but I can't take credit where none is due. I gained inspiration from the brilliant Jamies Buck, who so gratuitiously blogged about maze generation using myriad algorithms. His implementations were on Ruby and use a notation to this day I cannot decipher. However, the pseudo-code and explanations provided where more than enough to get the idea running on Javascript. <br/><br/>
Below I link Jamies blog on mazes. </br>
https://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm </br><br/>
<h3>Files that contain maze-building and maze-solving logic</h3>
In src/appFiles, there are a handful of files that store the logic that generates mazes. Those are chupacabraGeneration.js, ellersGeneration.js, kruskalsGeneration.js, primsGeneration.js, mazeGeneration.js, and cleanSlateGeneration.js (for the empty tamplate grid). The files where the maze-solving algorithms are located include AStarSolver.js and mazeSolver.js (contains the methods for both DFS and BFS algos since both share the same methods and data structures).<br/>
Every other file contains the JSX for each maze component. 

<h3>Happy Maze Solving!</h3>
