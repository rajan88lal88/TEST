let arr = [2, 6, 17, 28, 46, 68];
function prime(num) {
    for (let div = 2; div * div <= num; div++)
        if (num % div == 0)
            return false;
    return true;
}
function modify(num) {
    if (num % 2 == 0)
        return num + 1;
    else
        return num - 1;
}

Array.prototype.myfilter = function (cb) {
    let b = [];
    for (let i = 0; i < this.length; i++)
        if (cb(this[i]) == true)
            b.push(this[i]);
    return b;
}

Array.prototype.mymap = function (cb) {
    for (let i = 0; i < this.length; i++)
        this[i] = cb(this[i]);
    return this;
}
// console.log("Number is Prime");
const map1 = arr.mymap(modify);
console.log(map1);
const result = map1.myfilter(prime);
console.log(result);