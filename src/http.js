class Http{
    async get(url) {
        let response = await fetch(url)
            .then(data => data.json())
        return response;
    }     
    async post(url, data) {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }).then(data => data.json());
        return response;
    }
    async update(url, data) {
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }).then(data => data.json());
        return response;
    }
    async deleteData(url) {
        let response = await fetch(url, {
            method: 'DELETE'
        }).then(data => data.json());
        return response;
    }
}

let http = new Http();
export default http;