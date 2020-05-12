def is_prime(num)
    i=2
    while(i*i<=num)
        if(num%i==0)
            return false
        end
    i+=1;
    end
    return true
end


def range_prime(l,h)
    for i in (l..h).step(1)
        status=is_prime(i)
        if(status==true)
            puts i.to_s()+"\t"
        end
        # puts i.to_s()
        
    end
end

range_prime(2,100)