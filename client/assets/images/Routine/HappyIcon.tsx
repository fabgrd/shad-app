import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function HappyIcon() {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"

    >
      <Path
        d="M13.187 26.187c6.886 0 12.467-5.582 12.467-12.467 0-6.885-5.581-12.467-12.467-12.467C6.302 1.253.72 6.835.72 13.72c0 6.885 5.582 12.467 12.467 12.467z"
        fill="url(#paint0_linear_14_1403)"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.364 13.72a5.886 5.886 0 01-8.326 0"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.364 13.72a5.886 5.886 0 01-8.326 0"
        stroke="#000"
        strokeOpacity={0.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.211 10.798a.73.73 0 100-1.46.73.73 0 000 1.46zM15.755 10.798a.73.73 0 100-1.46.73.73 0 000 1.46z"
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_14_1403"
          x1={13.1873}
          y1={1.25293}
          x2={13.1873}
          y2={26.1868}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.046875} stopColor="#00D1C5" />
          <Stop offset={1} stopColor="#5FE452" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default HappyIcon