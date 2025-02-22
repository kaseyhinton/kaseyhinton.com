package main

import "fmt"

func main() {
	cleo := newDog("Cleo", "German Shepherd", 2)
	cleo.sayHello()

	// cleo2 := &cleo;

	var bob dog = dog{"Bob", "French Bulldog", 15}
	bob.sayHello()
}

type dog struct {
	name  string
	breed string
	age   int
}

func newDog(name string, breed string, age int) *dog {
	d := dog{
		name:  name,
		breed: breed,
		age:   age,
	}

	return &d
}

func (d *dog) sayHello() {
	message := fmt.Sprintf("%s, a %d year old %s, says Hello!", d.name, d.age, d.breed)
	fmt.Println(message)
}
