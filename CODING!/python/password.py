import string
import random

print("Password Generator!")

print("NUMBERS ONLY!!!")
numofpass = int(input("Give me the amount of passwords you want: "))
#make this the amount of random passwords generated
lengthofpass = int(input("Give me the length of passwords you want: "))
#this sets the length

#this loops how many they want
for index in range(numofpass):
    # sets size of string
    N = lengthofpass

    # using random.choices()
    # generating random strings
    res = ''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase +
                                 string.digits, k=N))

    # print random passes
    print("random password: " + str(res))