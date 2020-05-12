arr=[]
n=gets.chomp.to_i
for i in 1..n
    arr.push(gets.chomp.to_i)
end
max=0
msf=0
for i in 0..n-1
    if msf+arr[i]>0
        msf+=arr[i]
    else
        msf=0
    end
    if msf>max
        max=msf
    end
end
print "max contiguous sum="+max.to_s