package main

import (
	"fmt"
	"io"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "This is my website!\n")
}

func main() {
	http.HandleFunc("/", handler)

	fmt.Println("Server is running on port 8080")
	// Start the server on port 8080. ListenAndServe blocks until the program is interrupted.
	http.ListenAndServe(":8080", nil)
}
