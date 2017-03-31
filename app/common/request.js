/**
 * Created by DFZ on 2017/3/25.
 */
'use strict';
import queryString from 'query-string';
import _ from 'lodash';
import Mock from 'mockjs';
import Config from './config';

export default class Request {

    static async get(url, params) {
        if (params) {
            url += '?' + queryString.stringify(params);
        }
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let response = await fetch(url);
            let responseJson = await response.json();
            return Mock.mock(responseJson);
        } catch(error) {
            throw error;
        }
    }

    static async post(url, body) {
        const options = _.extend(Config.header, {
            body: JSON.stringify(body)
        });
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let response = await fetch(url, options);
            let responseJson = await response.json();
            return Mock.mock(responseJson);
        } catch(error) {
            throw error;
        }
    }
}