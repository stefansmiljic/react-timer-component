# Timer Component

The `Timer` component renders a countdown timer with start, pause, and reset functionality. It displays the elapsed and remaining time, along with a visual circular progress indicator.

## Props

- **title** (`string`): A title displayed at the top of the timer to label or describe the timer purpose.
- **endTime** (`number`): The countdown time limit in seconds, with a maximum of 3599 seconds (1 hour). Exceeding this limit will throw an error.
- **elapsedTime** (`number`, *optional*): The initial time elapsed, in seconds. If provided, the timer will start from this point; otherwise, it starts from 0.

## Component Structure and Styling

- The timer includes a textual display of elapsed time (`elapsedTimeMinutes:elapsedTimeSeconds`) and time remaining (`minutesLeft:secondsLeft`).
- It uses an SVG circle to visually represent the time remaining, where the progress circle dynamically updates as time decreases.
- Includes control buttons for Start, Pause, and Reset.

## Usage Example

```<Timer title="Exercise Timer" endTime={300} elapsedTime={60} />```
