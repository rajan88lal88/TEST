let greeter=function sayHi(){
    console.log("Hi");
}
greeter();
function isprime(num)
{
    for(let i=2;i*i<=num;i++)
        if(num%i==0)
            return false
    return true;
}

let ans=isprime(27);
if(ans==true)
    console.log("number is prime")
else    
    console.log("number is not prime");
