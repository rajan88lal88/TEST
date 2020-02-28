let arr=[2,6,17,28,46,68];
function prime(num)
{
    for(let div=2;div*div<=num;div++)
    if(num%div==0)
    {
        return false;
    }
    return true;
}
function modify(num)
{
    if(num%2==0)
        return num+1;
    else    
        return num-1;
}
console.log("Number is Prime");
const map1 = arr.map(modify);
console.log(map1);
const result = map1.filter(prime);
console.log(result);