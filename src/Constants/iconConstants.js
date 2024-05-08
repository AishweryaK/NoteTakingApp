import React from 'react';
import HOME from "../Assets/Svgs/Home.svg"

const iconStyle = (
  width = "0",
  height = "0",
  color = 'none',
  borderColor = 'none',
) => ({
  width: width,
  height: height,
  fill: color,
  stroke: borderColor,
})

export const ICONS = {
  HOME: (...params) =><HOME {...iconStyle(...params)} />,
}