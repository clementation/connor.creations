window.addEventListener('load', () =>{
    // Keeps tiles square
    squareGrid();
    // Set grid order to reflect dom order 
    orderGrid();
    //mantain square grid
    window.addEventListener('resize', squareGrid);
    //add event listeners checking for 'click' on project tiles 
    let allTiles = document.getElementById('gallery-container').children;
    for (const tile of allTiles){
        tile.addEventListener('click', openProject);
        tile.addEventListener('mouseenter', showTitle);
        tile.addEventListener('mouseout', hideTitle);
    }
    //add event listeners checking for 'click' off project tiles 
    document.addEventListener('click', closeProject);

    //activate first slide in image carousel
    activateFirstSlide();
})

// ===== Open Project =====
// Close any already open projects
// Open project user just clicked on
function openProject(evt){
    // check if project is expanded
    var projects = document.getElementById('gallery-container').children;
    for (const project of projects){
        if(project.dataset.active === "true"){
            var activeProject = project;
            break;
        }
    }
    // if expanded, set class to minimized
    if(activeProject){
        activeProject.classList.remove('project-open');
        activeProject.classList.add('project-closed');
        activeProject.querySelector('.carousel-container').classList.remove('carousel-container-open');
        activeProject.querySelector('.carousel-container').classList.add('carousel-container-closed');
        activeProject.dataset.active = "false";
        orderGrid();
    }


    // if minimized, set class ot expanded
    if(evt.currentTarget.dataset.active === "false"){
        evt.currentTarget.classList.remove('project-closed');
        evt.currentTarget.classList.add('project-open');
        evt.currentTarget.querySelector('.carousel-container').classList.remove('carousel-container-closed');
        evt.currentTarget.querySelector('.carousel-container').classList.add('carousel-container-open');
        evt.currentTarget.dataset.active = "true";
        makeOpenRowFront();
    }
    // if maximized do nothing
    else if(evt.currentTarget.dataset.active === "true"){
        console.log("Already Active");
    }
}

// ===== Close Project =====
// close currently open project if user clicks elsewhere on page
function closeProject(evt){
    var projects = document.getElementById('gallery-container').children;
    for (let project of projects){
        if(project.dataset.active === "true"){
            var activeProject = project;
            break;
        }
    }
    let clickedElement = evt.target;
    do{
        if(clickedElement === activeProject){
            return;
        }
        clickedElement = clickedElement.parentNode;
    }while(clickedElement);
    activeProject.classList.remove('project-open');
    activeProject.classList.add('project-closed');
    activeProject.querySelector('.carousel-container').classList.remove('carousel-container-open');
    activeProject.querySelector('.carousel-container').classList.add('carousel-container-closed');
    activeProject.dataset.active = "false";
    orderGrid();
}

// ===== Square Grid =====
// Set the height of closed tiles eqial to their width
function squareGrid(){
    var projectWidth = document.querySelector('.project-closed').offsetWidth;
    projectWidth = projectWidth / 2;
    document.querySelector('#gallery-container').style.setProperty('grid-auto-rows', `${projectWidth}px`);
}

// ===== Show Title =====
// changes height and padding of date-and-title to
// display when user cursor enters a project tile
// ! NOTE: Selection should not be hard coded !
function showTitle(evt){
    evt.currentTarget.children[1].children[0].style.setProperty('height', "auto");
    evt.currentTarget.children[1].children[0].style.setProperty('padding', "1.5% 2.5% 1.5% 2.5%");
}

// ===== Hide Title =====
// changes height and padding of date-and-title to
// hide when user cursor leaves a project tile
// ! NOTE: Selection should not be hard coded !
function hideTitle(evt){
    evt.currentTarget.children[1].children[0].style.setProperty('height', "0");
    evt.currentTarget.children[1].children[0].style.setProperty('padding', "0");
}

// ===== Order Grid =====
// `style.order` poroperty of tiles updates to reflect order in dom-tree 
function orderGrid(){
    const allTiles = document.getElementById('gallery-container').children;
    for(let i = 0; i < allTiles.length; i++){
        allTiles[i].style.setProperty('order', i);
    }
}

// ===== Make Open Row Front =====
// Swaps `style.order` property of open project tile and
// the tile at the front of the row. 
function makeOpenRowFront(){
    var projects = document.getElementById('gallery-container').children;
    for(let i = 0; i < projects.length; i++){
        if(projects[i].dataset.active === "true"){
            var rowStart = i;
            // `rowStart` represents the furthest left tile in a grid row
            while(rowStart % 3 != 0){
                rowStart--;
            }
            // swap tile positions in grid row
            projects[i].style.setProperty('order', rowStart);
            projects[rowStart].style.setProperty('order', i);
        }
    }
}

function activateFirstSlide(){
    const allCarouselContainers = document.getElementsByClassName('carousel-container-closed');
    for(const carouselContainer of allCarouselContainers){
        console.log(carouselContainer.children[2]);
        if(carouselContainer.children[2].children.length > 0){
            console.log(carouselContainer.children[2].children);
            carouselContainer.children[2].children[0].dataset.active = true;
        }
    }
}

//Magic node swap
//code pulled from online still need to unserstand how this works
// function swapProjectNodes(nodeA, nodeB){
//     console.log("in swap?");
//     const parentA = nodeA.parentNode;
//     const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
//     // Move `nodeA` to before the `nodeB`
//     nodeB.parentNode.insertBefore(nodeA, nodeB);
//     // Move `nodeB` to before the sibling of `nodeA`
//     parentA.insertBefore(nodeB, siblingA);
// }