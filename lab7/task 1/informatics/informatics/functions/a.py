import math
def minimum(a , b , c, d):
    print(min(min(a, b),min(c,d)))

a , b , c , d = map(int , input().split())
minimum(a, b, c, d)