import axios from 'axios'
const AxiosAllSpread = {}

/**
 * API_REPORT_ECHARTS = []
 * 调用：let resList = await axios.axiosAllSpread({ postList: API_REPORT_ECHARTS, params })
 */
export function axiosAllSpread({ postList = [], params = {} }) {
    let reqList = []
    postList.map((item, index) => {
        let req = axios.post(item, {...params }).catch((data) => {
            return {
                data: {
                    data: {},
                    errorcode: 1,
                    message: false
                }
            }
        })
        reqList.push(req)
    })
    return axios.all(reqList).then(axios.spread(function(...resList) {
        return resList
    }))
}

AxiosAllSpread.install = (Vue) => {
    Vue.prototype.$axiosAllSpread = axiosAllSpread
}

export default AxiosAllSpread