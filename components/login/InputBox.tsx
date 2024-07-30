import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

type InputBoxProps = {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
  };
export default function (props: InputBoxProps) {
    
    return (
            <TextInput
                placeholder={props.label}
                style={styles.phone_input_back}
                value={props.value}
                keyboardType="number-pad"
                onChangeText={props.onChangeText}
            />
    )
}
const styles = StyleSheet.create({
    phone_input_back: {
        backgroundColor: 'white',
        height: 'auto',
        width: '30%',
        textAlign: 'center',
        padding: 12,
        fontSize: 18,
        borderRadius: 5,
    },
})
