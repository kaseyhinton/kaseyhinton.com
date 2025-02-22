package main

import (
	"fmt"

	"github.com/aarzilli/nucular"
	"github.com/aarzilli/nucular/label"
	"github.com/aarzilli/nucular/style"
)

var sliderValue float64 = 50.0 // Initial slider value (range: 0-100)

func main() {
	wnd := nucular.NewMasterWindow(0, "Hello Nucular", update)
	wnd.SetStyle(style.FromTheme(style.WhiteTheme, 2.0))
	wnd.Main()
}

func update(w *nucular.Window) {
	// Call the function that handles the menu bar
	showMenuBar(w)

	w.Row(30).Dynamic(1)

	if w.ButtonText("Click Me!") {
		println("Button clicked!")
	}

	w.Row(60).Dynamic(1) // Create a single dynamic row with height 30

	// Add the slider
	w.SliderFloat(0.0, &sliderValue, 100.0, 1.0) // Slider range: 0-100, step size: 1.0

	// Display the slider value
	w.Row(30).Dynamic(1)
	w.Label(fmt.Sprintf("Slider Value: %.1f", sliderValue), "LC") // LC: Left-Centered

}

// Function to handle the menu bar
func showMenuBar(w *nucular.Window) {
	// Start the menu bar
	w.MenubarBegin()

	// Define the menu row
	w.Row(24).Static(100)

	// Create the "File" menu
	if menuWindow := w.Menu(label.TA("File", "LC"), 120, nil); menuWindow != nil {
		menuWindow.Row(25).Dynamic(1) // Add a dynamic row for menu items

		// Add the "Save" menu item
		if menuWindow.MenuItem(label.TA("Save", "LC")) {
			fmt.Println("Save clicked")
		}

		// Add the "Exit" menu item
		if menuWindow.MenuItem(label.TA("Exit", "LC")) {
			go menuWindow.Master().Close() // Close the application
		}
	}

	// End the menu bar context
	w.MenubarEnd()
}
