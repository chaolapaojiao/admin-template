// 品牌管理的路由
import request from '@/utils/request'

// 用户品牌管理
export const reqTradeInfo = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

// 添加或修改品牌
export const reqAddOrEditTrade = (tradeMark) => {
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', data: tradeMark, method: 'put' })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', data: tradeMark, method: 'post' })
    }
}

// 删除品牌
export const reqDeleteTradeMark = (id) => request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
})
