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
    // check if another project is already expanded
    var projects = document.getElementById('gallery-container').children;
    for (const project of projects){
        if(project.hasAttribute('data-active')){
            var activeProject = project;
            break;
        }
    }
    // if expanded, set class to minimized
    if(activeProject){
        deactivateProject(activeProject);
        orderGrid();
    }


    // if minimized, set class ot expanded
    if(!evt.currentTarget.hasAttribute('data-active')){
        activateProject(evt.currentTarget);
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
        if(project.hasAttribute('data-active')){
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
    deactivateProject(activeProject);
    orderGrid();
}

// ===== Square Grid =====
// Set the height of closed tiles eqial to their width
function squareGrid(){
    var project = document.querySelector('.project');
    var width = project.offsetWidth;
    var margin = parseInt(getComputedStyle(project).margin);
    console.log(width);
    console.log(margin);
    width = width / 2;
    document.querySelector('#gallery-container').style.setProperty('grid-auto-rows', `${width + margin}px`);
}

// ===== Show Title =====
// changes height and padding of date-and-title to
// display when user cursor enters a project tile
function showTitle(evt){
    if(!evt.currentTarget.hasAttribute('data-active')){
        var title = evt.currentTarget.querySelector('.date-and-title');
        title.style.setProperty('height', "auto");
        title.style.setProperty('padding', "1.5% 2.5% 1.5% 2.5%");
    }
}

// ===== Hide Title =====
// changes height and padding of date-and-title to
// hide when user cursor leaves a project tile
function hideTitle(evt){
    if(!evt.currentTarget.hasAttribute('data-active')){
        var title = evt.currentTarget.querySelector('.date-and-title');
        title.style.setProperty('height', "0");
        title.style.setProperty('padding', "0");
    }
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
        if(projects[i].hasAttribute('data-active')){
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

function activateProject(project){
    project.dataset.active = true;
    project.querySelector('.carousel-container').dataset.active = true;
    project.querySelector('.project-information').dataset.active = true;
    var title = project.querySelector('.date-and-title');
    title.dataset.active = true;
    title.style.removeProperty('height');
    title.style.removeProperty('padding');
    project.querySelector('.project-description').dataset.active = true;
}

function deactivateProject(project){
    project.removeAttribute('data-active');
    project.querySelector('.carousel-container').removeAttribute('data-active');
    project.querySelector('.project-information').removeAttribute('data-active');
    project.querySelector('.date-and-title').removeAttribute('data-active');
    project.querySelector('.project-description').removeAttribute('data-active');
}

function activateFirstSlide(){
    const allCarouselContainers = document.getElementsByClassName('carousel-container');
    for(const carouselContainer of allCarouselContainers){
        console.log(carouselContainer.children[0]);
        if(carouselContainer.children[0].children.length > 0){
            console.log(carouselContainer.children[0].children);
            carouselContainer.children[0].children[0].dataset.active = true;
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