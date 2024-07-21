import React from 'react';
import { View} from 'react-native';
import { Circle, Svg, Text as SvgText, Image as SvgImage } from 'react-native-svg';

export interface CircularFrameProps {
    height?: `${number}%` | number;
    width?: `${number}%` | number;
    fillColor?: string;
    stroke?: string;
    imageUrl?: string;
    text?: string;
}

export default function CircularFrame({ height = 100, width = 100, fillColor = 'grey', stroke = '', imageUrl, text ='Play with 5'}: CircularFrameProps) {

    const radius = Math.min(Number(height), Number(width)) / 2;

    return (
        <View style={{width: width, height: height, justifyContent: 'center', alignItems: 'center' }}>
            <Svg height={height} width={width}>
                <Circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill={fillColor}
                    stroke={stroke}
                    strokeWidth="3"
                />
                 {imageUrl && (
                    <SvgImage
                        x="50%"
                        y="50%"
                        width={radius * 2}
                        height={radius * 2}
                        href={require('../../assets/images/bg.png')}
                        clipPath="circle"
                    />
                )}
                 {text && (
                    <SvgText
                        x="50%"
                        y="50%"
                        fill="black"
                        fontSize="120%"
                        fontWeight="bold"
                        textAnchor="middle"                    
                    >
                        {text}
                    </SvgText>
                )}
            </Svg>
        </View>
    );
}
