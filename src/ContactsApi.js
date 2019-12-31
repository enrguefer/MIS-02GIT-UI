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

    static postContact(newContact){
        const headers = this.requestHeader();
        console.log("newContact", newContact)
        const request = new Request(ContactsApi.API_BASE_URL+ "/contacts", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newContact.name,
                phone: newContact.phone
              })
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }
}

export default ContactsApi;