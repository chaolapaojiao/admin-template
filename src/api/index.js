// 将四个模块请求的接口函数统一暴露
import * as trademark from '@/api/product/trademark'
import * as attr from '@/api/product/attr'
import * as spu from '@/api/product/spu'
import * as sku from '@/api/product/sku'

export default {
    trademark,
    attr,
    spu,
    sku
}