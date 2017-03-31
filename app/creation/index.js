/**
 * Created by DFZ on 2017/3/23.
 */
'use strict';
import React, {Component} from 'react';
import Item from './item';
import Request from '../common/request';
import Config from '../common/config';
import Detail from './detail';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

const CachedResult = {
    items: [],
    nextPage: 1,
    total: 0,
}

export default class List extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            if (r1 !== r2) {
                console.log("不相等=");
                console.log(r1);
                console.log(r2);
            } else {
                console.log("相等=");
                console.log(r1);
                console.log(r2);
            }
            return r1 !== r2;
        }});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoadingTail: false,
            isRefreshing: false,
        }
    }

    componentDidMount() {
        this._fatchData(1);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          renderFooter={this._renderFooter.bind(this)}
                          onEndReached={this._fatchMoreData.bind(this)}
                          onEndReachedThreshold={20}
                          enableEmptySections={true}
                          automaticallyAdjustContentInsets={false}
                          showsVerticalScrollIndicator={false}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this._onRefresh.bind(this)}
                                  tintColor='#f60'
                                  title='Loading...'
                              />
                          }
                />
            </View>
        )
    }

    _renderRow(row) {
        return (
            <Item row={row} itemClick={this._goToDetail.bind(this)}/>
        )
    }

    _goToDetail(row) {
        this.props.navigator.push({
            name: 'detail',
            component: Detail,
            params: { row: row},
        });
    }

    async _fatchData(page) {
        try {
            if (page !== 0) {
                this.setState({
                    isLoadingTail: true,
                });
            } else {
                this.setState({
                    isRefreshing: true,
                });
            }

            let result = await Request.get(Config.api.base + Config.api.creation, {
                accessToken: '112',
                page: page,
            });
            if (result.success) {
                let items = CachedResult.items.slice(0);
                if (page != 0) {
                    items = items.concat(result.data);
                    ++CachedResult.nextPage;
                } else {
                    items = result.data.concat(items);
                }

                CachedResult.items = items;
                CachedResult.total = result.total;
                if (page != 0) {
                    this.setState({
                        isLoadingTail: false,
                        dataSource: this.state.dataSource.cloneWithRows(CachedResult.items),
                    });
                } else {
                    this.setState({
                        isRefreshing: false,
                        dataSource: this.state.dataSource.cloneWithRows(CachedResult.items),
                    });
                }

            } else {
                this.setState({
                    isRefreshing: false,
                    isLoadingTail: false,
                });
            }
        } catch(error) {
            this.setState({
                isRefreshing: false,
                isLoadingTail: false,
            });
        }
    }

    _fatchMoreData() {
        if (!this._hasMore() || this.state.isLoadingTail) {
            return;
        }
        this._fatchData(CachedResult.nextPage);
    }

    _hasMore() {
        return CachedResult.items.length != CachedResult.total;
    }

    _renderFooter() {
        if (!this._hasMore() && CachedResult.total != 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            );
        }
        return (
            <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 80}]}
                size="small"
            />
        );
    }

    _onRefresh() {
        if (!this._hasMore() || this.state.isRefreshing) {
            return;
        }
        this._fatchData(0);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    header: {
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#ea735c',
        height: 64,
        justifyContent: 'center',
    },

    headerTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    loadingMore: {
        marginVertical: 20,
    },

    loadingText: {
        color: '#777',
    },

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
