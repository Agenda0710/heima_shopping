import request from "@/utils/request";

export function getHomeData(){
    return request.get('/page/detail',{
        params:{
            page: '0',
        }
    })
}
