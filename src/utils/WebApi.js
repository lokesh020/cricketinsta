import axios from 'axios';


const axiosInstance = axios.create({
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

class WebApi {

    constructor() {
        
    }

    getRequest = (requestPath = "", headers = {}) => {
        console.log("get request >>>> " + requestPath + " headers >>>> " + JSON.stringify(headers))
        let promise = new Promise(async(resolve, reject) => {
            axiosInstance.get(requestPath, {
                headers: {
                    ...headers,
                },
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                },
            }).then((response) => {
                if (response.data !== undefined) {
                    console.log("api response >>>>" + JSON.stringify(response.data))
                    resolve({
                        data : response.data,
                        totalRecords : response.headers["x-wp-total"]
                    })
                }
            }).catch((error) => {
                console.log("error in get request>>>> url >>>> " + requestPath + "========" + JSON.stringify(error))
                const errStatusObj = {
                    statusCode: 0,
                    statusMsg: ""
                }
                if (error.response) {
                    /*
                    * The request was made and the server responded with a
                    * status code that falls out of the range of 200 - 500
                    */
                    errStatusObj.statusCode = error.response.status
                    errStatusObj.statusMsg = error.message
                    reject(errStatusObj)
                } else if (error.request) {
                    /*
                    * The request was made but no response was received, `error.request`
                    * is an instance of XMLHttpRequest in the browser and an instance
                    * of http.ClientRequest in Node.js
                    */
                    errStatusObj.statusCode = 501
                    errStatusObj.statusMsg = "check you internet connection"
                    reject(errStatusObj)
                } else {
                    // Something happened in setting up the request and triggered an Error
                    errStatusObj.statusMsg = error.message
                    reject(errStatusObj)
                }
            })
        })
        return promise
    }

    postRequest = (requestPath = "", body = {}, headers = {}) => {
        console.log("post request >>>> " + requestPath + " headers >>>> " + JSON.stringify(headers) + "body >>>>" + JSON.stringify(body))
        let promise = new Promise(async(resolve, reject) => {
            axiosInstance.post(requestPath, body, {
                headers: {
                    ...headers,
                },
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                },
            }).then((response) => {
                if (response.data !== undefined) {
                    console.log("api response >>>>" + JSON.stringify(response.data))
                    resolve(response.data)
                }
            }).catch((error) => {
                console.log("error in post request>>>> url >>>> " + requestPath + "========" + JSON.stringify(error))
                const errStatusObj = {
                    statusCode: 0,
                    statusMsg: ""
                }
                if (error.response) {
                    /*
                    * The request was made and the server responded with a
                    * status code that falls out of the range of 200 - 500
                    */
                    errStatusObj.statusCode = error.response.status
                    errStatusObj.statusMsg = error.message
                    reject(errStatusObj)
                } else if (error.request) {
                    /*
                    * The request was made but no response was received, `error.request`
                    * is an instance of XMLHttpRequest in the browser and an instance
                    * of http.ClientRequest in Node.js
                    */
                    errStatusObj.statusCode = 501
                    errStatusObj.statusMsg = "check you internet connection"
                    reject(errStatusObj)
                } else {
                    // Something happened in setting up the request and triggered an Error
                    errStatusObj.statusMsg = error.message
                    reject(errStatusObj)
                }
            })
        })
        return promise
    }

}




export default new WebApi();