import { request } from './request'

export function getTestData(url, params) {
    return request({
        methods: 'get',
        url: url,
        params: params
    })
}