package main

import "fmt"

func multiplyByTwoWithLoop(n int) int {
	sum := 0

	for i := 1; i <= n; i++ {
		sum = sum + 2
	}

	return sum
}

func multiplyByTwoWithRecursion(n int) int {
	if n == 0 {
		return 0
	}

	return 2 + multiplyByTwoWithRecursion(n-1)
}

func multiplyByPowerOfTwoWithRecursion(n int) int {
	if n == 0 {
		return 1
	}

	return 2 * multiplyByPowerOfTwoWithRecursion(n-1)
}

func recursivePowerOfTwo(n int) int {
	if n == 0 {
		return 1
	}

	return 2 * multiplyByPowerOfTwoWithRecursion(n-1)
}

func main() {
	fmt.Println("Multiply by 2")
	fmt.Println(multiplyByTwoWithRecursion(7))
	fmt.Println("-------------")
	fmt.Println("Multiply by power of 2")
	fmt.Println(recursivePowerOfTwo(4))
}
