import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {getMovieDetails} from "../../api/utils/MovieProvider";

class DetailsComponent extends React.Component {

    static navigationOptions = ({navigation}) => {
        const movie = navigation.getParam('movie', null);
        let title = "Detail";
        if (movie !== null) {
            title = movie.title
        }
        return {
            title: title
        }
    };

    _getMovieFrmoProp() {
        return this.props.navigation.getParam('movie', null);

    }

    componentDidMount() {
        const movie = this._getMovieFrmoProp();
        getMovieDetails(movie.id, (movieDetails) => {
            console.log(movieDetails);
        })
    }

    render() {
        const movie = this._getMovieFrmoProp();
        if (!movie) {
            return (
                <View style={styles.centerItem}>
                    <Text style={styles.errorText}>Movie id is required</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>Movie Details</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    errorText: {
        fontSize: 25,
        color: '#CB4335',
        fontWeight: 'bold'
    },
    centerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default withNavigation(DetailsComponent);