class ContactsApi{
    static API_BASE_URL = "/api/v1"

    static requestHeader(){
        return{}
    }

    static getAllContacts(){
        const headers = this.requestHeader();
        const request = new Request(ContactsApi.API_BASE_URL+ "/contacts", {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
}

export default ContactsApi;