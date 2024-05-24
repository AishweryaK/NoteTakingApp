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
import ARROW from "../Assets/Svgs/chevron-forward-outline.svg"
import EYEON from "../Assets/Svgs/eye-outline.svg"
import EYEOFF from "../Assets/Svgs/eye-off.svg"
import NOTEWHITE from "../Assets/Svgs/white-note.svg"
import NOTEBLUE from "../Assets/Svgs/blue-note.svg"
import PIECHART from "../Assets/Svgs/pie-chart.svg"
import MAIL from "../Assets/Svgs/mail-outline.svg"
import REMINDER from "../Assets/Svgs/date-reminder-icon.svg"


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
  ARROW: (...params) =><ARROW {...iconStyle(...params)} />,
  EYEON: (...params) =><EYEON {...iconStyle(...params)} />,
  EYEOFF: (...params) =><EYEOFF {...iconStyle(...params)} />,
  NOTEWHITE: (...params) =><NOTEWHITE {...iconStyle(...params)} />,
  NOTEBLUE: (...params) =><NOTEBLUE {...iconStyle(...params)} />,
  PIECHART: (...params) =><PIECHART {...iconStyle(...params)} />,
  MAIL: (...params) =><MAIL {...iconStyle(...params)} />,
  REMINDER: (...params) =><REMINDER {...iconStyle(...params)} />,
}