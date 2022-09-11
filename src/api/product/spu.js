import request from '../../utils/request'

// 获取spu属性
export const reqGetSpuInfo = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    params: {
        category3Id
    },
    method: 'get'
})

// 获取spu基本信息
export const reqSpu = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
})

// 获取spu品牌信息
export const reqTradeMarkList = () => request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: 'get'
})
// 获取spu图标信息
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
})

// 获取销售属性
export const reqGetAttr = () => request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
})
// 添加或修改spu
export const reqEditOrAddSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
    } else {
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
    }
}
// 删除spu
export const reqDeleteSpu = (spuId) => request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
})
// 获取图片数据
export const reqImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
})

// 获取销售属性数据
export const reqSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
})
//获取属性信息数据
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
})

// 保存spu
export const reqSaveSkuInfo = (data) => request({
    url: '/admin/product/saveSkuInfo',
    data,
    method: 'post'
})

// 获得sku列表数据
export const reqSkuList = (spuId) => request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
})
