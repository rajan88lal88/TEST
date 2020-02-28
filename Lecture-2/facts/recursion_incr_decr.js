function printdec(num) {
    if (num == 0)
        return;
    console.log(num);
    printdec(num - 1);
}
function printincr(num) {
    if (num == 0)
        return;
    printincr(num - 1);
    console.log(num);
}
printdec(5);
printincr(5);