# react-tilt-3d

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) [![try me!](https://img.shields.io/badge/try%20me!-DEMO%20PAGE%20%F0%9F%9A%80-green?labelColor=white&style=for-the-badge&link=https://danivalls.github.io/react-tilt-3d/)](https://danivalls.github.io/react-tilt-3d/)

<p align="center">
  <img src="https://raw.githubusercontent.com/danivalls/react-tilt-3d/master/assets/demogif.gif?raw=true" />
</p>
  <p align="center">
  <i style="font-size: 8px; text-align:center; width: 100%; display: inline-block;">(Image card in example is a creation from <a href="https://www.reddit.com/r/mpcproxies/comments/ydtuxu/hello_everyone_i_just_made_a_complete_fully_dark/">@mpcproxies</a> user on reddit)</i>
</p>

### 🚀 Features

- Highly customizable component via props:
  - Scale when tilting
  - Stop tilting when cursor leaves window
  - Stop tilting when cursor distance from object exceeds limit
  - Stop tilting when cursor hovers the object
  - Tilt in all axis or only in one (x or y)
  - Customize how much you want it to tilt
  - Customize the action radius
- Events onTiltStart, onTiltEnd, and onTiltChange
- Compatible with touch devices
- Apply the tilt effect to anything used as children.
- Applies a lighting effect to reinforce the 3d-effect.
- Strongly typed
- Experiment as much as you want with the [demo page](https://danivalls.github.io/react-tilt-3d/)

### 📦 Installation

`npm i react-tilt-3d`<br/>
`yarn add react-tilt-3d`

### ✨ Usage

Just wrap your content with Tilt3D:

```jsx
import { Tilt3D } from 'react-tilt-3d';

const MyComponent = () => {
  return (
    <Tilt3D>
      <SomeOtherComponent />
    </Tilt3D>
  );
};
```

### 🛠️ Customization

Several customizations can be made via props:

| prop                     | type                               | description                                                                                                                                                                              | required | default |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `maxTilt`                | `number`                           | Maximum amount of degrees the element will tilt                                                                                                                                          | `false`  | `25`    |
| `resetTiltOnOutOfBounds` | `boolean`                          | Determines if the tilt should reset to `0` if the cursor or pointer exceeds a distance from the element                                                                                  | `false`  | `false` |
| `resetTiltOnHover`       | `boolean`                          | Determines if the tilt should reset to `0` if the cursor or pointer hover the element. (Note that if actionOffset is `0` and resetTiltOnHover is set to true, no tilt will be ever show) | `false`  | `false` |
| `actionOffset`           | `number`                           | Distance away from the center in which the tilt will be maxTilt.                                                                                                                         | `false`  | `0`     |
| `zoomOnTilt`             | `boolean`                          | If true, the element will scale when it is tilting                                                                                                                                       | `false`  | `false` |
| `zoomScale`              | `number`                           | Amount of scaling the element will do with zoomOnTilt. (Recommended values between 1 and 1.5)                                                                                            | `false`  | `1.25`  |
| `lockAxisX`              | `boolean`                          | If true, the element will not tilt in the X axis.                                                                                                                                        | `false`  | `false` |
| `lockAxisY`              | `boolean`                          | If true, the element will not tilt in the Y axis.                                                                                                                                        | `false`  | `false` |
| `onTiltChange`           | `({x: number, y: number}) => void` | Callback to be executed every time the tilt changes.                                                                                                                                     | `false`  |         |
| `onTiltStart`            | `() => void`                       | Callback to be executed every time the tilt starts                                                                                                                                       | `false`  |         |
| `onTiltEnd`              | `() => void`                       | Callback to be executed every time the tilt ends and returns to 0                                                                                                                        | `false`  |         |

| `className` | `string` | classname to apply to the wrapper | `false` | |
| `children` | `ReactNode` | The content to apply the tilt. | `false` | |
