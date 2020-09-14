console.log("This is popup");

document.getElementById("btn1").addEventListener("click", addWebsite);
function addWebsite(){
    var x=document.getElementById("website").value;
    console.log(x);
}