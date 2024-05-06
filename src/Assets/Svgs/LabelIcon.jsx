import * as React from "react"
import Svg, { Rect, G, Path, Defs } from "react-native-svg"

function LabelIcon(props) {
  return (
    <Svg
      width={222}
      height={241}
      viewBox="0 0 222 241"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={64}
        y={46.0676}
        width={100}
        height={100}
        rx={10}
        transform="rotate(-9.246 64 46.068)"
        fill="#6B4EFF"
        fillOpacity={0.05}
      />
      <Rect
        x={79}
        y={40}
        width={100}
        height={100}
        rx={10}
        fill="#6B4EFF"
        fillOpacity={0.05}
      />
      <G filter="url(#filter0_d_18_4603)">
        <Path
          d="M16 51c0-11.046 8.954-20 20-20h67.669a20 20 0 0116.31 8.425l10.042 14.15A20 20 0 00146.331 62H167c11.046 0 20 8.954 20 20v100c0 11.046-8.954 20-20 20H36c-11.046 0-20-8.954-20-20V51z"
          fill="#fff"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default LabelIcon;