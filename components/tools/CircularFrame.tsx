import React from 'react';
import { Pressable, View} from 'react-native';
import { Circle, Svg, Text as SvgText, Image as SvgImage } from 'react-native-svg';

export interface CircularFrameProps {
    height?: `${number}%` | number;
    width?: `${number}%` | number;
    fillColor?: string;
    stroke?: string;
    imageUrl?: string;
    amount?: number;
    onPlayClick: (amount:number,gameType:string) => void,
    gameType:string
}

export default function CircularFrame({ height = 100, width = 100, fillColor = 'grey', stroke = '', imageUrl, amount =0,onPlayClick,gameType}: CircularFrameProps) {

    const radius = Math.min(Number(height), Number(width)) / 2;

    return (
        <Pressable style={{width: width, height: height, justifyContent: 'center', alignItems: 'center' }} onPress={()=>onPlayClick(amount,gameType)}>
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
                 {amount && (
                    <SvgText
                        x="50%"
                        y="50%"
                        fill="black"
                        fontSize="120%"
                        fontWeight="bold"
                        textAnchor="middle"                    
                    >
                        {`play with ${amount}`}
                    </SvgText>
                )}
            </Svg>
        </Pressable>
    );
}
