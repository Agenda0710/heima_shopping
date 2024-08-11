import request from "@/utils/request";

export const getProductList = (obj) => {
    const {categoryId,goodsName,page} = obj
    return request.get('/goods/list',{
        params:{
            categoryId,
            goodsName,
            page
        }
    })
}

export const getProductDetail = (goodsId) => {
    return request.get('/goods/detail',{
        params:{
            goodsId
        }
    })
}
