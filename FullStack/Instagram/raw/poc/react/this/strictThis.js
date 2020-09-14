"use strict";
let myObj={
    name:"Rajan",
    sayHi:function(){
        console.log(this);
        function inner(){
            console.log(this);
        }
        let bindinner=inner.bind(this,null);
        inner();
        bindinner();
    }
}
myObj.sayHi();
// temp();
// console.log(global);