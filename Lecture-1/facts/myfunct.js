let arr=[2,6,17,28,46,68];
function prime()
{
    num=arguments[0];
    for(let div=2;div*div<=num;div++)
    if(num%div==0)
        return false;
    return true;
}
function modify(num)
{
    if(num%2==0)
        return num+1;
    else    
        return num-1;
}
function mymap(a,modify)
{
    for(let i=0;i<a.length;i++)
        a[i]=modify(a[i]);
    return a; 
}
function myfilter(a,prime)
{
    let b=[];
    for(let i=0;i<a.length;i++)
        if(prime(a[i])==true)
            b.push(a[i]);
    return b;
}

// console.log("Number is Prime");
const map1 = mymap(arr,modify);
console.log(map1);
const result = myfilter(map1,prime);
console.log(result);