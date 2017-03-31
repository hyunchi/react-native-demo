/**
 * Created by DFZ on 2017/3/23.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Dimensions,
} from 'react-native';
import Video from 'react-native-video';
const width = Dimensions.get('window').width;

export default class Detail extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: this.props.row,
        };
    }

    render() {
        const data = this.state.data;
        return (
            <View style={styles.container}>
                <Text onPress={() => this.props.navigator.pop()}>详情页面</Text>
                <View style={styles.videoBox}>
                    <Video
                        ref='videoPlayer'
                        source={{uri: data.video}}
                        style={styles.video}
                        volume={4}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                        paused={false}
                        rate={1}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                        muted={false}              // true代表静音，默认为false.
                        resizeMode='contain'
                        repeat={false}
                        onLoadStart={this._onLoadStart} // 视频开始加载时调用
                        onLoad={this._onLoad}           // 视频加载时调用
                        onProgress={this._onProgress}   // 视频播放时,每隔250毫秒,调用一次,参数是已播放时间
                        onEnd={this._onEnd}
                        onError={this._onError}

                    />
                </View>
            </View>
        )
    }

    _onLoadStart() {
        console.log('load start');
    }

    _onLoad() {
        console.log('load');
    }

    _onProgress(progress) {
        console.log('progress:', progress);
        console.log('progress');
    }

    _onEnd() {
        console.log('end');
    }

    _onError() {
        console.log('error');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    videoBox: {
        width: width,
        height: 360,
        backgroundColor: '#000',
    },

    video: {
        width: width,
        height: 360,
        backgroundColor: '#000',
    },
});
