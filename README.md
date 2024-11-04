# Timer Component

The `Timer` component renders a countdown timer with start, pause, and reset functionality. It displays the elapsed and remaining time, along with a visual circular progress indicator.

## Props

- **title** (`string`): A title displayed at the top of the timer to label or describe the timer purpose.
- **endTime** (`number`): The countdown time limit in seconds, with a maximum of 3599 seconds (1 hour). Exceeding this limit will throw an error.
- **elapsedTime** (`number`, *optional*): The initial time elapsed, in seconds. If provided, the timer will start from this point; otherwise, it starts from 0.

## Timer logic
- Timer component comes with three buttons: Start, Pause and Reset. Each of them is linked to a certain function that sets their respected states. When `isStarted` state is changed, `useEffect` hook is triggered, which then checks the state of `isStarted` and according to it starts or stops timer ticking logic.
  
## Component Structure and Styling

- The timer includes a textual display of elapsed time (`elapsedTimeMinutes:elapsedTimeSeconds`) and time remaining (`minutesLeft:secondsLeft`).
- It uses an SVG circle to visually represent the time remaining, where the progress circle dynamically updates as time decreases.
- Includes control buttons for Start, Pause, and Reset.

- The CSS file for the `Timer` component defines the layout, appearance, and animations for a countdown timer with control buttons.

## Key Classes

- **`.timer_container`**: Main wrapper for the timer. It has rounded corners, padding, and a dark background color to distinguish the timer area.
- **`.timer_content`**: Contains the text display for elapsed and remaining time. Positioned absolutely within the container.
- **`.timer_controls`**: Flex container that holds the control buttons (Start, Pause, Reset). Buttons are styled with rounded corners, a dark background, and white text. They change color on hover.
- **`.timer_text`** and **`.other_text`**: Control the font size and color for the timer's main and secondary text elements.

## SVG Circle and Timer Progress

- **`.svg_circle`**: Rotates the SVG circle by `-90deg` to start the stroke at the top.

- **Progress Circle**: The timer's progress is displayed with an SVG circle, where:
  - **`strokeDasharray`** defines the full circumference of the circle. This sets the length of the progress path.
  - **`strokeDashoffset`** dynamically decreases to show time passing. It is calculated as `circumference - ((endTime - timeLeft) / endTime) * circumference`, moving the stroke to create a countdown effect.

## Completion Animation

- **`.timer_complete`**: Applied when the timer completes. It uses the `color_pulse` animation, which alternates the circle's color between green (`#67cb88`) and red (`#cb6767`) every second, providing a pulsing effect to indicate that time is up.

## Usage Example

```<Timer title="Exercise Timer" endTime={300} elapsedTime={60} />```
