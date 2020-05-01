function promiseCreator()
{
    return new Promise(function abc(resolve,reject)
    {
        setTimeout(function()
        {
            resolve(10);
        },1000)
    })
}
let pPromise=promiseCreator();
function resolve(data)
{
    console.log("Inside resolve");
    console.log(data);
}
function reject(err)
{
    console.log("Inside reject");
    console.log(err);
}
function resolve1(data)
{
    console.log("Inside resolve 1");
    console.log(data);
}
function reject1(err)
{
    console.log("Inside reject 1");
    console.log(err);
}
pPromise.then(resolve,reject).then(resolve1,reject1);
