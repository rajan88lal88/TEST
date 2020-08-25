ctx.lineWidth=5;
let activeTool='pencil';
let pencil=document.querySelector("#pencil");
let eraser=document.querySelector("#eraser");
let pencilOptions=document.querySelector("pencil")
function handleTool(tool) {
    if (tool == "pencil") {
        ctx.strokeStyle = "black";
    } else if (tool == "eraser") {
        ctx.strokeStyle = "white"
    }

}