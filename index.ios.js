/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Navigator,
} from 'react-native';
import List from './app/creation/index';
import Edit from './app/edit/index';
import Account from './app/account/index';

export default class dfz extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab: 'blueTab'
        }
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="white"
                barTintColor="#F5FCFF">
                <Icon.TabBarItem
                    iconName={'ios-videocam-outline'}
                    selectedIconName={'ios-videocam'}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab'
                        })
                    }}>
                    <Navigator
                        initialRoute={{
                            name:'list',
                            component: List,
                        }}
                        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                        renderScene={(router, navigator) => {
                            const Component = router.component;
                            return <Component {...router.params} navigator={navigator}/>
                        }}
                    />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName={'ios-recording-outline'}
                    selectedIconName={'ios-recording'}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'redTab'
                        })
                    }}>
                    <Edit/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName={'ios-more-outline'}
                    selectedIconName={'ios-more'}
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab'
                        })
                    }}>
                    <Account/>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('dfz', () => dfz);
