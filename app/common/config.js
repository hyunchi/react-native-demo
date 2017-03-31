/**
 * Created by DFZ on 2017/3/25.
 */
'use strict';
export default class Config {
    static header = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
    };

    static api = {
        base: 'http://rap.taobao.org/mockjs/15919/',
        creation: 'api/creations',
        up: 'api/up',
    }
}