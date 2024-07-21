import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LIGHT_GREY } from '../../utils/constants';
import CircularFrame from '../tools/CircularFrame';

export default function Launcher() {
    const playOptionAmounts = [5, 10, 20, 30, 40, 50, 100];

    return (
        <View style={styles.container}>
            <View style={styles.eventContainer} />
            <View style={{marginLeft: '5%'}}>
                <CircularFrame height={150} width={150} text={`Play with ${playOptionAmounts.at(0)}`} fillColor={LIGHT_GREY} />
            </View>
            <View style={styles.playAmountContainer}>
                {playOptionAmounts.slice(1).map((val, index) => {
                    const rowIndex = Math.floor(index / 3);
                    const isFirstInRow = index % 3 === 0;
                    const offset = isFirstInRow ? rowIndex * 30 : 0; 
                    return (
                        <View
                            key={index}
                            style={[
                                styles.circularFrameContainer,
                                { marginLeft: offset }
                            ]}
                        >
                            <CircularFrame height={120} width={120} text={`Play with ${val}`} fillColor={LIGHT_GREY} />
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventContainer: {
        width: '15%',
        height: '70%',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: LIGHT_GREY,
        marginLeft: '5%'
    },
    playAmountContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '50%'
    },
    circularFrameContainer: {
        width: '30%',
        marginVertical: 5,
        alignItems: 'center',
    },
});

