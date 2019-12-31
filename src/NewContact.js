import React from 'react';
import ContactsApi from './ContactsApi.js'

class NewContact extends React.Component {

    constructor(props){
        super(props);
        this.state = {id:'', name: '', phone: ''};
        this.changeContact = this.changeContact.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeContact(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
    }

    clickAdd(){
        
        ContactsApi.postContact(this.state)
            .then( 
                (result) => {
                    if(result.status === 201){
                        this.props.onAddContact(this.state);
                        this.setState({
                            id:'', name: '', phone: ''
                        })
                    }else{
                        this.setState({
                            errorInfo: "Failed when inserting the new contact!"
                        })
                    }
                }
                ,(error) => {
                    this.setState({
                        errorInfo: "Failed when inserting the new contact!"
                    })
                }
            );
    }

    render(){
        return(
            <tr>
                <td><input className="form-control" name="name" value={this.state.name} onChange={this.changeContact}/></td>
                <td><input className="form-control" name="phone" value={this.state.phone} onChange={this.changeContact}/></td>
                <td><button className="btn btn-warning" onClick={this.clickAdd}>Add Contact</button></td>
            </tr>
        );
    }
}

export default NewContact;