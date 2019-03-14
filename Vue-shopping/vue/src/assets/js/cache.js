// 缓存
import storage from 'good-storage'
const TAB_LIST = 'tab'      // TAB 
// const COMMODITY_ID = 'commodity-id' // 单条商品的id
const ADDRESS = 'address'     // 地址列表
const RECENTLY_BROWSE = 'browse'  // 最近浏览
const CITY = 'city'         // 默认城市
const SEARCH_HISYSTORY = 'searchHistory' // 搜索历史
const TOKEN = 'token'
export const tab = {
    getTab() {
        return storage.get(TAB_LIST,[])
    },

    setTab(list) {
        return storage.set(TAB_LIST,list)
    },
}

// 用户修改单条地址
export const address = {
    getAddress() {
        return storage.get(ADDRESS,{})
    },

    setAddress(list) {
        return storage.set(ADDRESS,list)
    },

    clearAddress() {
        return storage.remove(ADDRESS)
    }
}

// 最近浏览
export const recentlyBrowse = {
    getBrowse() {
        return storage.get(RECENTLY_BROWSE,[])
    },

    setBrowse(data) {
        let newData = this.getBrowse()
        if (newData.length) {
            newData.forEach((item,index) => {
                if (item.id == data.id) {
                    newData.splice(index,1)
                }
            })
        }
        newData.unshift(data)
        if (newData.length > 30) {  // 最近浏览最多30条缓存
            newData.pop()
        }
        storage.set(RECENTLY_BROWSE,newData)
        return newData
    },

    clearBrowse() {
        return storage.remove(RECENTLY_BROWSE)
    },

    // 删除一条
    deleteOne(id) {
        let data = this.getBrowse()
        const index = data.findIndex((val,ind,arr) => {
            return id == val.id
        })
        data.splice(index,1)
        storage.set(RECENTLY_BROWSE,data)
        return data
    }
}

// 缓存城市
export const city = {
    getCity() {
        return storage.get(CITY,'北京市')
    },

    setCity(city) {
        return storage.set(CITY,city)
    }
}

// 搜索历史
export const searchHistory = {
    getHistory() {
        return storage.get(SEARCH_HISYSTORY,[])
    },

    setHistory(data) {
        let newData = this.getHistory()
        if (newData.length) {
            newData.forEach((item,index) => {
                if (item == data) {
                    newData.splice(index,1)
                }
            })
        }
        newData.unshift(data)
        if (newData.length > 15) {  // 最近浏览最多30条缓存
            newData.pop()
        }
        storage.set(SEARCH_HISYSTORY,newData)
        return newData
    },

    clearHistory() {
        return storage.set(SEARCH_HISYSTORY,[])
    }
}

export const token = {
    getToken() {
        return storage.get(TOKEN,'')
    },

    setToken(token) {
        return storage.set(TOKEN,token)
    },
    clearToken() {
        return storage.remove(TOKEN)
    }
}