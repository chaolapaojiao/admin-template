// attr模块接口
import request from '@/utils/request'
// 获取一级分类数据
export const reqCategoryList1 = () => request({
    url: "/admin/product/getCategory1",
    method: 'get'
})

// 获取二级分类
export const reqCategoryList2 = (category1Id) => request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
})

// 获取三级分类
export const reqCategoryList3 = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
})

// 获取属性数据
export const reqAttrInfo = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
})

// 添加属性名
export const reqAddOrEditAttr = (data) => request({
    url: '/admin/product/saveAttrInfo',
    data,
    method: 'post'
})

// 删除属性
export const reqDeleteAttr = (attrId) => request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
})

