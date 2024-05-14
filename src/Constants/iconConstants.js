import React from 'react';
import HOME from "../Assets/Svgs/Home.svg"
import NOTE from "../Assets/Svgs/note.svg"
import NOTEFD from "../Assets/Svgs/noteFocused.svg"
import LAMP from "../Assets/Svgs/Lamp.svg"
import LAMPFD from "../Assets/Svgs/LampFocused.svg"
import SETTINGS from "../Assets/Svgs/Settings.svg"
import SETTINGSFD from "../Assets/Svgs/SettingsFocused.svg"
import CHECKLIST from "../Assets/Svgs/Checklist.svg"
import CHECKLISTFD from "../Assets/Svgs/ChecklistFocused.svg"
import ACCOUNT from "../Assets/Svgs/person-outline.svg"
import CHANGEP from "../Assets/Svgs/lock-closed-outline.svg"
import THEME from "../Assets/Svgs/eyedrop-outline.svg"
import LOGOUT from "../Assets/Svgs/log-out-outline.svg"
import CAMERA from "../Assets/Svgs/camera-outline.svg"


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
  NOTE: (...params) =><NOTE {...iconStyle(...params)} />,
  NOTEFD: (...params) =><NOTEFD {...iconStyle(...params)} />,
  LAMP: (...params) =><LAMP {...iconStyle(...params)} />,
  LAMPFD: (...params) =><LAMPFD {...iconStyle(...params)} />,
  SETTINGS: (...params) =><SETTINGS {...iconStyle(...params)} />,
  SETTINGSFD: (...params) =><SETTINGSFD {...iconStyle(...params)} />,
  CHECKLIST: (...params) =><CHECKLIST {...iconStyle(...params)} />,
  CHECKLISTFD: (...params) =><CHECKLISTFD {...iconStyle(...params)} />,
  ACCOUNT: (...params) =><ACCOUNT {...iconStyle(...params)} />,
  CHANGEP: (...params) =><CHANGEP {...iconStyle(...params)} />,
  THEME: (...params) =><THEME {...iconStyle(...params)} />,
  LOGOUT: (...params) =><LOGOUT {...iconStyle(...params)} />,
  CAMERA: (...params) =><CAMERA {...iconStyle(...params)} />,
}