import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {MoviesList} from "./src/components/MoviesList";

export default class App extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MoviesList genre='action'/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
