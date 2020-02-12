import {
  request,
  newrequest
} from './request';
export function getDetailData(iid) {
    return newrequest({
        url: '/detail',
        params:{
            iid
        }
    })
}