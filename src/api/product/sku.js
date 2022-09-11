import request from '@/utils/request'

// 获取sku数据
export const reqSkuList = (page, limit) => request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
})

// sku上架
export const reqSkuOnSale = (skuId) => request({

    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
})
// sku下架
export const reqSkuCancerSale = (skuId) => request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
})
// 删除sku
export const reqDeleteSku = (skuId) => request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
})