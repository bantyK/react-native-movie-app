import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class CommonInfo extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.marginBottom3, styles.textTitle]}>{this.props.title}</Text>
                <Text style={styles.textData}>{this.props.data}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    marginBottom3: {
        marginBottom: 3,
    },
    textTitle: {
        color:'#99A3A4'
    },
    textData: {
        color:'#212F3D'
    }
});