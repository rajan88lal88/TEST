"use strict";
let myObj={
    name:"Rajan",
    sayHi:function(){
        console.log(this);
        let inner=()=>{
            console.log(this);
        }
        inner();
        
    }
}
myObj.sayHi();
// temp();
// console.log(global);