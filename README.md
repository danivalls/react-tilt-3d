# react-tilt-3d

![Typed](https://img.shields.io/badge/Typed-blue?style=flat&logo=TypeScript&logoColor=white) [![npm version](https://badge.fury.io/js/react-tilt-3d.svg)](https://badge.fury.io/js/react-tilt-3d)

---

### 📦 Installation

`npm i react-tilt-3d`
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

| prop                     | type        | description                                                                                                                                                                              | required | default |
| ------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `maxTilt`                | `number`    | Maximum amount of degrees the element will tilt                                                                                                                                          | `false`  | `45`    |
| `resetTiltOnOutOfBounds` | `boolean`   | Determines if the tilt should reset to `0` if the cursor or pointer exceeds a distance from the element                                                                                  | `false`  | `false` |
| `resetTiltOnHover`       | `boolean`   | Determines if the tilt should reset to `0` if the cursor or pointer hover the element. (Note that if actionOffset is `0` and resetTiltOnHover is set to true, no tilt will be ever show) | `false`  | `false` |
| `actionOffset`           | `number`    | Distance away from the center in which the tilt will be maxTilt.                                                                                                                         | `false`  | `0`     |
| `zoomOnTilt`             | `boolean`   | If true, the element will scale when it is tilting                                                                                                                                       | `false`  | `false` |
| `zoomScale`              | `number`    | Amount of scaling the element will do with zoomOnTilt. (Recommended values between 1 and 1.5)                                                                                            | `false`  | `1.25`  |
| `lockAxisX`              | `boolean`   | If true, the element will not tilt in the X axis.                                                                                                                                        | `false`  | `false` |
| `lockAxisY`              | `boolean`   | If true, the element will not tilt in the Y axis.                                                                                                                                        | `false`  | `false` |
| `className`              | `string`    | classname to apply to the wrapper                                                                                                                                                        | `false`  |         |
| `children`               | `ReactNode` | The content to apply the tilt.                                                                                                                                                           | `false`  |         |
