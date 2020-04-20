let arr=[4,14,17,23,48,66]
function odd_even(num)
{
    if(num%2==0)
        return num+1;
    else    
        return num-1;
}
// let newarr=arr.map(odd_even);
// console.log(newarr);
function isprime(data){
    for(let i=2;i*i<=data;i++)
        if(data%i==0)
            return false;
    return true;
}
// newarr=newarr.filter(isprime);
// console.log(newarr);
Array.prototype.mymap=function(cb)
{
    let arr=[];
    for(let i=0;i<this.length;i++)
        arr.push(cb(this[i]));
    return arr;
}
Array.prototype.myfilter=function(cb)
{
    let arr=[];
    for(let i=0;i<this.length;i++)
        if(cb(this[i])==true)
            arr.push(this[i]);
    return arr;
}
let newarr=arr.mymap(odd_even);
console.log(newarr);
newarr=newarr.myfilter(isprime);
console.log(newarr);