import React from 'react';

class NewContact extends React.Component {

    constructor(props){
        super(props);
        this.state = {name: '', phone: ''};
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
        this.props.onAddContact(this.state);
        this.setState({
            name: '', phone: ''
        });
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