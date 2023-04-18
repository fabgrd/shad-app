import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function AngryIcon() {
    return (
        <Svg
            width={26}
            height={27}
            viewBox="0 0 26 27"
            fill="none"
        >
            <Path
                d="M12.976 25.73c6.885 0 12.467-5.582 12.467-12.467 0-6.885-5.582-12.467-12.467-12.467C6.091.796.51 6.378.51 13.263c0 6.885 5.582 12.467 12.467 12.467z"
                fill="url(#paint0_linear_14_1381)"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M8.809 15.58a5.886 5.886 0 018.326 0M7.112 8.798H18.84"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M9.646 10.383a.73.73 0 100-1.46.73.73 0 000 1.46zM15.543 10.362a.73.73 0 100-1.46.73.73 0 000 1.46z"
                fill="#000"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_14_1381"
                    x1={12.9761}
                    y1={0.795898}
                    x2={12.9761}
                    y2={25.7298}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0.477265} stopColor="#FF7575" />
                    <Stop offset={1} stopColor="#FF9F00" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default AngryIcon
