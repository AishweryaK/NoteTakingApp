import * as React from "react"
import Svg, { Rect } from "react-native-svg"

function CircleIcon(props) {
  return (
    <Svg
      width={53}
      height={53}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width={52.5159}
        height={52.5159}
        rx={26.258}
        fill="#6B4EFF"
        fillOpacity={0.1}
      />
    </Svg>
  )
}

export default CircleIcon;