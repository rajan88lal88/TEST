let {exec} = require("child_process")
function framework(data,scb,fcb)
{
    console.log();
    for(num=2;num<data*data;num++)
        if(data%num==0)
            return fcb();
    return scb();
}
function success()
{
    console.log("Number is prime");
    exec("calc");
    return true;
}
function failure()
{
    console.log("Number is not prime");
    exec("start chrome");
    return false;
}
let a1=framework(23,success,failure);
console.log(a1);