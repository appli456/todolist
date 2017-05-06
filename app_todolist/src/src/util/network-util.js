/**
 * Created by li-rz on 17-5-4.
 */
import axios from 'axios';

class NetworkStore{
    constructor() {
        // this.data = [];
    }

    static getData() {
        return axios.get('http://localhost:8000/api/get-data')
            .then(function(res) {
                return res.data;
        });
    }

    static addItem(obj) {
        return axios.post('http://localhost:8000/api/add-data', obj)
            .then(function (res) {
                return res.data;
            })
    }

    static editItem(id, obj) {
        return axios.post(`http://localhost:8000/api/edit-data/${id}`, obj)
            .then(function (res) {
                return res.data;
            })
    }

    static deleteItem(id) {
        return axios.get(`http://localhost:8000/api/delete-data/${id}`)
            .then((res) => {
                return res.data;
            })
    }
}

// let networkStore = new NetworkStore();
export default NetworkStore;