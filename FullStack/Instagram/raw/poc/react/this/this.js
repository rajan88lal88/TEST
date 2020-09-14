let myObj={
    name:"Rajan",
    sayHi:function(){
        console.log(this);
        function inner(){
            console.log(this);
        }
        inner();
    }
}
let temp=myObj.sayHi;
temp();
// console.log(global);