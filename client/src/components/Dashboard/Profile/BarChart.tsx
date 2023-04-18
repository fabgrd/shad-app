import { View, Text } from 'react-native'
import React from 'react'

// Graph
import {
    BarChart as BarGraph,
} from "react-native-chart-kit";


// Screen dimensions
import { Dimensions } from "react-native";

// Styles
import colors from '../../../styles/colors';

type BarChartProps = {
    labels: string[],
    data: any,
}

const BarChart = ({
    labels,
    data,
}
    : BarChartProps) => {

    const { LIGHT_BLUE } = colors

    const chartConfig = {
        backgroundColor: "white",
        color: () => `${LIGHT_BLUE}`,
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.8,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 0,
    };

    const graphStyle = {
        marginVertical: 8,
        borderRadius: 16,
    };

    const screenWidth = Dimensions.get("window").width;
    const barWidth = screenWidth - (screenWidth / 4);

    return (
        <View>
            <BarGraph
                style={graphStyle}
                data={data}
                width={barWidth}
                height={220}
                yAxisLabel=""
                yAxisSuffix='h'
                chartConfig={chartConfig}
                verticalLabelRotation={0}
            />
        </View>
    )
}

export default BarChart