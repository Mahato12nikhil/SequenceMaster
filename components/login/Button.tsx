import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR_WHITE, COLOR_YELLOW } from '../../utils/constants'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
type ButtonProps = {
    text: string;
    loading: boolean;
    onClick: () => void;
};

export default function Button(props: ButtonProps) {

    return (
        <Pressable style={styles.loginButton} onPress={props.onClick}>
            <View style={styles.loginButtonContent}>
                {props.loading ? (
                    <ActivityIndicator color={COLOR_WHITE} />
                ) : (
                   <Text style={styles.loginButtonText}>{props.text}</Text>
                )}
                <Icon name='arrow-right-circle' size={20} style={styles.loginButtonIcon} />
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    loginButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        flex: 1,
    },
    loginButtonIcon: {
        marginLeft: 10,
    },
    loginButton: {
        marginTop: '2%',
        width: '30%',
        height: 'auto',
        padding: 12,
        backgroundColor: COLOR_YELLOW,
        borderRadius: 5
    },
})