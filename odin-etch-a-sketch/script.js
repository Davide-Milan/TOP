const slider = document.querySelector('#size-slider');
const grid = document.querySelector('.grid');
const root = document.querySelector(':root');
const gridSize = getComputedStyle(root).getPropertyValue('--grid-size');
const brush = document.querySelector('#brush');
const eraser = document.querySelector('#eraser');
const clear = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');

let mode = 'brush';
let color;
let mouseDown = false
root.onmousedown = () => (mouseDown = true)
root.onmouseup = () => (mouseDown = false)

function loadGrid(size){
    color = colorPicker.value;
    for(let i = 0; i < size*size; i++){  // and creates the new grid
        let pixel = document.createElement('div');
        pixel.classList.add('pixel')
        pixel.addEventListener('mousedown', paint);
        pixel.addEventListener('mouseover', paint);
        grid.appendChild(pixel);
    }
}

function paint(event){
    if(event.type == 'mouseover' && !mouseDown) return;
    if(mode == 'brush')
        event.target.style.setProperty('background-color', color);
    else if (mode == 'eraser')
        event.target.style.setProperty('background-color', 'white');
}


function setSize(e){
    let val = slider.value;
    if(val != gridSize){      //if value changes => deletes the current grid,        
        root.style.setProperty('--grid-size', val); // sets the new size
        clearGrid();
    }    
}

function clearGrid(){
    let gridPixels = [...grid.children];
    console.log(gridPixels.length)
    gridPixels.forEach(pixel => pixel.remove());
    console.log(slider.value);
    loadGrid(slider.value);
}

function setColor(e){
    color = e.target.value;
    console.log(color);
}
function setMode(newMode){
    mode = newMode;
}


colorPicker.addEventListener('input', setColor);
brush.addEventListener('click', () => setMode('brush'));
eraser.addEventListener('click', () => setMode('eraser'));
clear.addEventListener('click', clearGrid);


slider.addEventListener('input', setSize);
slider.value = gridSize;
console.log(gridSize);
loadGrid(gridSize);