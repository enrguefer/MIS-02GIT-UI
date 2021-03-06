import React from 'react';
import Contact from './Contact.js';
import Alert from './Alert.js';
import NewContact from './NewContact.js';
import EditContact from './EditContact.js'
import ContactsApi from './ContactsApi.js'


class Contacts extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            errorInfo: null,
            contacts: [],
            isEditing: {}
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onAddContact = this.addContact.bind(this);
    }

    componentDidMount(){
        ContactsApi.getAllContacts()
            .then( 
                (result) => {
                    this.setState({contacts: result})
                }
                ,(error) => {
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    })
                }
            );
    }

    handleEdit (contact) {
        this.setState( prevState => ({
            isEditing: {...prevState.isEditing, [contact.name]: contact}
        }));
    }

    handleCloseError(){
        this.setState({
            errorInfo: null
        });
    }

    async addContact(contact){
        console.log(contact)

        if(contact.name==="" || contact.phone===""){
            this.setState({
                errorInfo: "You must write all the contact fields"
            })
        
        }else{
            try{
                await ContactsApi.postContact(contact)
            }catch(err){
                this.setState({
                    errorInfo: "Failed when inserting the new contact!"
                })
            }
    
            try{
                let allContacts = await ContactsApi.getAllContacts();
                this.setState({
                        contacts: allContacts
                    }
                )
            }catch (err){
                this.setState({
                    errorInfo: "Problem with connection to server"
                })
            }
        }
    }

    handleCancel(name, contact) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[name];
            return{
                isEditing: isEditing
            }
        });
    }

    handleChange(name, contact) {
        this.setState(prevState => ({
            isEditing: {...prevState.isEditing, [name]: contact}
        }))
    }

    async handleSave(name, contact){

        try{
            await ContactsApi.putContact(contact)
            const isEditing = Object.assign({}, this.state.isEditing);
            delete isEditing[name];
            this.setState({
                isEditing: isEditing
            })
        }catch(err){
            this.setState({
                errorInfo: "Failed when updating the contact!"
            })
        }

        try{
            let allContacts = await ContactsApi.getAllContacts();
            this.setState({
                    contacts: allContacts
                }
            )
        }catch (err){
            this.setState({
                errorInfo: "Problem with connection to server"
            })
        }
    }

    async handleDelete(contact){
        try{
            await ContactsApi.deleteContact(contact.id);
            let allContacts = await ContactsApi.getAllContacts();
            this.setState({
                    contacts: allContacts
                }
            )
        }catch (err){
            this.setState({
                errorInfo: "Failed when deleting the contact!"
            })
        }
    }

    render(){
        return(
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <NewContact onAddContact={this.onAddContact}></NewContact>
                        {this.state.contacts.map((contact) => 
                            ! this.state.isEditing[contact.name] ?
                            <Contact key={contact.name} contact={contact} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
                            :
                            <EditContact key={contact.id} contact={this.state.isEditing[contact.name]} 
                                onCancel={this.handleCancel.bind(this, contact.name)}
                                onChange={this.handleChange.bind(this, contact.name)}
                                onSave={this.handleSave.bind(this, contact.name)}></EditContact>
                        )}
                    </tbody>
                    
                </table>                
            </div>

        );
    }
}

export default Contacts;