a = int(input())
b = int(input())

for i in range(1, b + 1):  
    square = i * i
    if square > b:  
        break
    if square >= a:  
        print(square, end=" ")
