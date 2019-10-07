import React from 'react';
import DiscoverMoviesComponent from "./src/components/DiscoverMoviesComponent";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SearchComponent from "./src/components/search/SearchComponent";
import MovieDetailsComponent from "./src/components/details/MovieDetailsComponent";

const AppNavigator = createStackNavigator({
    Discover: {
        screen: DiscoverMoviesComponent
    },
    Details: {
        screen: MovieDetailsComponent
    },
    Search: {
        screen: SearchComponent
    }
}, {
    initialRouteName: 'Discover',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

export default createAppContainer(AppNavigator);

