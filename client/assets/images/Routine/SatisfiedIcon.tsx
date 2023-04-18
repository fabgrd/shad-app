import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SatisfiedIcon() {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
    >
      <Path
        d="M13.134 26.216c6.886 0 12.467-5.582 12.467-12.467 0-6.886-5.581-12.467-12.466-12.467C6.248 1.282.667 6.863.667 13.749c0 6.885 5.581 12.467 12.466 12.467z"
        fill="url(#paint0_linear_14_1396)"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.78 14.193c-.217.095-.474.17-.758.222a5.04 5.04 0 01-.894.078 5.04 5.04 0 01-.893-.078 3.433 3.433 0 01-.758-.222"
        fill="#fff"
      />
      <Path
        d="M14.78 14.193c-.217.095-.474.17-.758.222a5.04 5.04 0 01-.894.078 5.04 5.04 0 01-.893-.078 3.433 3.433 0 01-.758-.222"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.159 10.827a.73.73 0 100-1.46.73.73 0 000 1.46zM15.702 10.827a.73.73 0 100-1.46.73.73 0 000 1.46z"
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_14_1396"
          x1={13.1345}
          y1={1.28174}
          x2={13.1345}
          y2={26.2157}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.326022} stopColor="#2298FF" />
          <Stop offset={0.734375} stopColor="#47BDFF" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SatisfiedIcon
