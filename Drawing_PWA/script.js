let window_width = window.innerWidth;
let window_height = window.innerHeight;

const toolbar = document.getElementById("toolbar_container")
const tool_count = 3 //remember to change this when adding a new tool
const tool_size = window_width/tool_count
const tools = ["lapis", "borracha", "color_picker"]
let selected_tool = "lapis";
const canvas = document.getElementById("canvas");
const canvas_container = document.getElementById("drawing_container");
const contextOptions = { willReadFrequently: true };
const ctx = canvas.getContext('2d', contextOptions);
ctx.imageSmoothingEnabled = false;

canvas.width =  window_width;


grid_size = 8;
cell_size = canvas.width / grid_size;


canvas.height = (grid_size*cell_size);



let selected_color = "black"

let grid_state = Array(grid_size).fill().map(() => Array(grid_size).fill("white"))
let grid_history = []
let history_step = 0

is_grid_visible = true;
is_topmenu_dropdown_visible = false;


function save_canvas_state(){
    // isso faz o undo/redo funcionar perfeitamente mas não funciona no celular por algum motivo
    // if (history_step < history.length - 1) {
    //     document.write(grid_history) // phone gets until here
    //     history = history.slice(0, history_step + 1);
    //     document.write(grid_history) // doesn't work anymore
    // }
    
    if(grid_history.length > 25){grid_history.splice(0,1)};
    grid_history.push(ctx.getImageData(0,0,canvas.width,canvas.height))
    console.log(grid_history)
    history_step++;
    
    if(history_step>grid_history.length){history_step = grid_history.length};
    console.log(history_step)
    
}

function undo(){
    if (history_step>0){
        history_step -= 2;
        console.log(history_step)
        ctx.putImageData(grid_history[history_step],0,0)
        if(is_grid_visible){draw_grid_lines()};
    }
}

function redo(){
    if(history_step<grid_history.length-1){
        history_step += 2;
        console.log(history_step)
        ctx.putImageData(grid_history[history_step],0,0)
        if(is_grid_visible){draw_grid_lines()};
    }
}

function erase_grid_lines(){
    ctx.strokeStyle = "white";
    for(let i = 0; i <= grid_size; i++){
        //vertical lines
        ctx.beginPath();
        ctx.moveTo(i * cell_size,0);
        ctx.lineTo(i * cell_size, window_height);
        ctx.stroke();


        //horizontal lines
        ctx.moveTo(0, i*cell_size);
        ctx.lineTo(window_width, i*cell_size);
        ctx.stroke();
    }    
}

function draw_grid_lines(){
    ctx.strokeStyle = "gray";
    for(let i = 0; i <= grid_size; i++){
        //vertical lines
        ctx.beginPath();
        ctx.moveTo(i * cell_size,0);
        ctx.lineTo(i * cell_size, window_height);
        ctx.stroke();


        //horizontal lines
        ctx.moveTo(0, i*cell_size);
        ctx.lineTo(window_width, i*cell_size);
        ctx.stroke();
    }
}

let is_drawing = false;

function draw_rect(x_,y_){
    
    
    let x = Math.floor(x_/cell_size);
    let y = Math.floor(y_/cell_size);

    
    if(selected_tool == "lapis"){
        ctx.fillStyle = selected_color
        grid_state[x][y] = selected_color
    }
    if(selected_tool == "borracha"){
        ctx.fillStyle = "white"
        grid_state[x][y] = "white"
    }
    
    ctx.fillRect(x*cell_size, y*cell_size, cell_size, cell_size)
}

function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

document.addEventListener("pointermove", (e) => {
    if(isTouchDevice){
    if(is_drawing){
        draw_rect(e.offsetX, e.offsetY)
       
    }}

});

canvas.addEventListener("pointerdown", (e) => {
    if(isTouchDevice){
    is_drawing = true;
    
    draw_rect(e.offsetX, e.offsetY)
    }
});

canvas.addEventListener("pointerup", () => {
    if(isTouchDevice){
    is_drawing = false
    save_canvas_state();
    if(is_grid_visible){draw_grid_lines()};
    }
});

document.addEventListener("touchmove", (e) => {
    
    if(is_drawing){
        draw_rect(e.offsetX, e.offsetY)
       
    }

});

canvas.addEventListener("touchstart", (e) => {
    is_drawing = true;
    
    draw_rect(e.offsetX, e.offsetY)

});

canvas.addEventListener("touchend", () => {
    is_drawing = false
    save_canvas_state();
    console.log("salvou")
    if(is_grid_visible){draw_grid_lines()};

    
});
















toolbar.addEventListener("pointerdown", (e) => {
    let x = Math.floor(e.x/tool_size);
    selected_tool = tools[x]
});


function change_color(button){
    selected_color = button.dataset.color;
    selected_tool = tools[0]
}

function toggle_grid(button){
    if(button.checked){
        //just unchecked
        is_grid_visible = false;
        erase_grid_lines();
    }
    else{
        //just checked
        is_grid_visible = true;
        draw_grid_lines();
    }
}

function show_topmenu_button(){
    let top_menu_dropdown = document.querySelector(".topmenu_button")
    if(is_topmenu_dropdown_visible)
        {
            top_menu_dropdown.style.opacity = "0";
            top_menu_dropdown.style.visibility = "hidden"; 
            is_topmenu_dropdown_visible = false;
        }
    else{
        top_menu_dropdown.style.opacity = "1"; 
        top_menu_dropdown.style.visibility = "visible"; 
        is_topmenu_dropdown_visible = true}
        ;
    
    
}

function export_canvas(){
    let dataUrl = canvas.toDataURL("image/png");
    let drawing_tile = document.querySelector("#input_title").value;
    let a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${drawing_tile}.png`;
    a.click()
}

if(is_grid_visible){draw_grid_lines()};










// registrando sw

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then((registration) => {
        console.log("SW registrado com sucesso")
        console.log(registration)
    }).catch((error) => {
        console.log("Falha ao registrar o SW")
        console.log(error)
    })
}