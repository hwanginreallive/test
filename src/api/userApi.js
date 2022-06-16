import axiosClient from "./axiosClient"

const userApi = {
    getAll: (params) => {
        const url ="/";
        return axiosClient.get(url,{params})
    },
    getName: (params,name) => {
        const url =`/${name}`;
        return axiosClient.get(url,{params})
    }
}

export default userApi