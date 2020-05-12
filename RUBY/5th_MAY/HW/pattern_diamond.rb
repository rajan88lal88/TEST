n=gets.chomp.to_i
i=0
j=0
# upper half
for i in 0..n/2
    # space
    for j in 0..(n/2-i-1)
        print " \t"
    end
    # stars
    for j in 1..(2*i+1)
        print "*\t"
    end
    puts
end
# lower half
for i in i+1..n-1
    # space
    for j in 0..(i-n/2-1)
        print " \t"
    end
    # stars
    for j in 1..(2*(n-i)-1)
        print "*\t"
    end
    puts
end
