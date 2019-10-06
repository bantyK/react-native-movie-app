import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {MoviesList} from "./MoviesList";

export default class DiscoverMoviesComponent extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <MoviesList genre='action'/>
                <MoviesList genre='comedy'/>
                <MoviesList genre='animation'/>
                <MoviesList genre='drama'/>
                <MoviesList genre='horror'/>
                <MoviesList genre='documentary'/>
                <MoviesList genre='history'/>
                <MoviesList genre='family'/>
                <MoviesList genre='fantasy'/>
                <MoviesList genre='music'/>
                <MoviesList genre='romance'/>
                <MoviesList genre='thriller'/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:40
    },
});
