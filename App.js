import React from 'react';
import {StyleSheet, SafeAreaView, Text, ActivityIndicator} from 'react-native';
import {getMoviesData} from "./src/api/utils/MovieProvider";
import {MoviesList} from "./src/components/MoviesList";

export default class App extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            movies: [],
            dataLoading: true,
        }
    }

    componentDidMount() {
        getMoviesData("action", 1, (movies) => {
            console.log(movies.length);
            this.setState({
                movies,
                dataLoading:false,
            })
        });
    }

    render() {
        if (this.state.dataLoading) {
            return <ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}/>
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <MoviesList movies={this.state.movies}/>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
