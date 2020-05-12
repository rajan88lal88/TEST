def fibo(n)
    a=0
    b=1
    c=1
    for i in (1..n-1)
        c=a+b
        a=b
        b=c
    end
    return a
end

l=gets.chomp.to_i
h=gets.chomp.to_i
for i in (l..h)
    print fibo(i).to_s+"\t"
end
# print fibo(5).to_s