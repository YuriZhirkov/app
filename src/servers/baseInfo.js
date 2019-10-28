
import { request } from './request'
// import { request } from "@/servers/request";
export function register(params) {
    return request({
        methods: 'post',
        url: "/user/baseInfo/register",
        params: params
    })
}
export function getPhoneValidateCode(params) {
    return request({
        methods: 'get',
        url: "/user/baseInfo/getPhoneValidateCode",
        params: params
    })
}