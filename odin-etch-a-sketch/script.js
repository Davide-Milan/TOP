const slider = document.querySelector('#size-slider');
const grid = document.querySelector('.grid');
const root = document.querySelector(':root');
let gridSize = getComputedStyle(root).getPropertyValue('--grid-size');
const brush = document.querySelector('#brush');
const eraser = document.querySelector('#eraser');
const rainbow = document.querySelector('#rainbow');
const fill = document.querySelector('#fill');
const clear = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');

let colored;
let mode = 'brush';
let color;

//this is used to draw by dragging but it messes with the slider value for some reasons
// let mouseDown = false
// root.onmousedown = () => (mouseDown = true)
// root.onmouseup = () => (mouseDown = false)

function loadGrid(size){
    color = hexToRgb(colorPicker.value);
    for(let i = 0; i < size*size; i++){  // and creates the new grid
        let pixel = document.createElement('div');
        pixel.id = i;
        pixel.classList.add('pixel')
        pixel.addEventListener('mousedown', paint);
        pixel.addEventListener('mouseover', paint);
        grid.appendChild(pixel);
    }
}

function paint(event){
    if(event.type == 'mouseover' /*&& !mouseDown*/) return;
    if(mode == 'brush')
        event.target.style.setProperty('background-color', color);
    else if (mode == 'eraser')
        event.target.style.setProperty('background-color', 'rgb(255, 255, 255)');
    else if (mode == 'rainbow'){    //random color each time you click on a pixel
        let R = Math.floor(Math.random()*255);
        let G = Math.floor(Math.random()*255);
        let B = Math.floor(Math.random()*255);
        event.target.style.setProperty('background-color', `rgb(${R}, ${G}, ${B})`);
    }
    else if (mode == 'fill')
        fillColor(event);
}


function setSize(e){        
    let val = slider.value;
    console.log(val);
    console.log(gridSize);
    if(val != gridSize){      //if value changes => deletes the current grid,        
        root.style.setProperty('--grid-size', val); // sets the new size
        gridSize = val;
        clearGrid();
    }
    console.log(gridSize);
}

function isInside(pos){
    if(pos>=0 && pos < slider.value*slider.value) return true;
    return false;
}

function recursiveFillColor(pixels, pos, selectedPixelColor){
    pos = +pos;
    if(!isInside(pos)) return;
    if(selectedPixelColor != pixels[pos].style.getPropertyValue('background-color')) return;
    pixels[pos].style.setProperty('background-color', color);
    
    if(pos % slider.value != 0)
        recursiveFillColor(pixels, pos-1, selectedPixelColor);
    recursiveFillColor(pixels, pos-slider.value, selectedPixelColor);
    if(pos+1 % slider.value != 0)
        recursiveFillColor(pixels, pos+1, selectedPixelColor);
    recursiveFillColor(pixels, pos + +slider.value, selectedPixelColor);
    
    
    // console.log(pos);
    // if(isInside(pos-1) && getComputedStyle(pixels[pos-1]).getPropertyValue('background-color')==selectedPixelColor)  //the pixel on the left
    //     recursiveFillColor(pixels, pos-1);
    // if(isInside(pos-slider.value) && getComputedStyle(pixels[pos-slider.value]).getPropertyValue('background-color')==selectedPixelColor)    //the pixel over
    //     recursiveFillColor(pixels, pos-slider.value);
    // if(isInside(pos+1) && getComputedStyle(pixels[pos+1]).getPropertyValue('background-color')==selectedPixelColor)    //the pixel on the right
    //     recursiveFillColor(pixels, pos+1);
    // if(isInside(pos+slider.value) && getComputedStyle(pixels[pos+slider.value]).getPropertyValue('background-color')==selectedPixelColor)    //the pixel under
    //     recursiveFillColor(pixels, pos+slider.value);
    // console.log(pixels[pos]);
    // pixels[pos].style.setProperty('background-color', color);
}

function fillColor(e){
    let gridPixels = [...grid.children];
    let clickedPixel = e.target;
    colored = [slider.value*slider.value];
    colored.fill(false);
    if(color != gridPixels[clickedPixel.id].style.getPropertyValue('background-color')){
        recursiveFillColor(gridPixels, clickedPixel.id, clickedPixel.style.getPropertyValue('background-color'));
    }
}

function clearGrid(){
    let gridPixels = [...grid.children];
    gridPixels.forEach(pixel => pixel.remove());
    loadGrid(slider.value);
}

function hexToRgb(hex) {
    let rgbValues = ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
    return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
}
function setColor(e){
    color = hexToRgb(e.target.value);
}
function setMode(newMode){
    mode = newMode;
}


colorPicker.addEventListener('change', setColor);
brush.addEventListener('click', () => setMode('brush'));
eraser.addEventListener('click', () => setMode('eraser'));
rainbow.addEventListener('click', () => setMode('rainbow'))
fill.addEventListener('click', () => setMode('fill'))
clear.addEventListener('click', clearGrid);

slider.addEventListener('input', setSize);
slider.value = gridSize;

loadGrid(gridSize);