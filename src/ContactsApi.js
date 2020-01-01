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

    static putContact(updateContact){
        const request = new Request(ContactsApi.API_BASE_URL+ "/contact/"+updateContact.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: updateContact.name,
                phone: updateContact.phone
              })
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    static deleteContact(id){
        const headers = this.requestHeader();
        const request = new Request(ContactsApi.API_BASE_URL+ "/contact/"+id, {
            method: 'DELETE',
            headers: headers
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }
}

export default ContactsApi;