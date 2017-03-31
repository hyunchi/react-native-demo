/**
 * Created by DFZ on 2017/3/23.
 */
'use strict';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Request from '../common/request';
import Config from '../common/config';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Dimensions,
    AlertIOS,
} from 'react-native';

const width = Dimensions.get('window').width;

export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            up: this.props.row.voted,
        }
    }

    render() {
        const row = this.state.row;
        return (
            <TouchableHighlight onPress={this._clicked.bind(this)}>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <Image
                        source={{uri: row.thumb}}
                        style={styles.thumb}
                    >
                        <Icon
                            name='ios-play'
                            size={28}
                            style={styles.play}
                        />
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon
                                name={this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                                size={28}
                                style={this.state.up ? styles.up : styles.down}
                                onPress={this._up.bind(this)}
                            />
                            <Text style={styles.handleText}  onPress={this._up.bind(this)}>喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Icon
                                name='ios-chatboxes-outline'
                                size={28}
                                style={styles.commentIcon}
                            />
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    async _up() {
        const up = !this.state.up;
        const id = this.state.row.id;
        const body = {
            accessToken: '1212',
            up: up,
            id: id,
        };
        try {
            const result = await Request.post(Config.api.base + Config.api.up, body);
            if (result.success) {
                this.setState({
                    up: up,
                });
            } else {
                AlertIOS.alert('','点赞失败,请稍后再试');
            }
        } catch (error) {
            console.log(error);
            AlertIOS.alert('', '点赞失败,请稍后再试');
        }

    }

    _clicked() {
        this.props.itemClick(this.state.row);
    }
}

const styles = StyleSheet.create({

    item: {
        width: width,
        marginBottom: 10,
        backgroundColor: '#fff',
    },

    title: {
        padding: 10,
        fontSize: 18,
        color: '#333',
    },

    thumb: {
        width: width,
        height: width * 0.56,
        resizeMode: 'cover',
    },

    play: {
        position: 'absolute',
        bottom:14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        color: '#ed7b66',
    },

    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },

    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.6,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    down: {
        fontSize: 22,
        color: '#333',
    },

    up: {
        fontSize: 22,
        color: '#ed7b66',
    },

    commentIcon: {
        fontSize: 22,
        color: '#333'
    },

    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333'
    },

});
