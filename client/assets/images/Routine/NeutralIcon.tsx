import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NeutralIcon() {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
    >
      <Path
        d="M13.082 26.377c6.885 0 12.467-5.581 12.467-12.467 0-6.885-5.582-12.467-12.467-12.467C6.196 1.443.615 7.025.615 13.91c0 6.886 5.581 12.467 12.467 12.467z"
        fill="#FFE500"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.848 13.823h2.468"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.109 10.989a.73.73 0 100-1.46.73.73 0 000 1.46zM15.156 11.01a.73.73 0 100-1.46.73.73 0 000 1.46z"
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default NeutralIcon
