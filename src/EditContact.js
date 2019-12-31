import React from 'react';

function EditContact(props){
    
    const handleChange = event => {
        props.onChange({...props.contact, [event.target.name]: event.target.value})
    }
    
    return(
        <tr>
            <td><input className="form-control" name="name" value={props.contact.name} onChange={handleChange} disabled></input></td>
            <td><input className="form-control" name="phone" value={props.contact.phone} onChange={handleChange}></input></td>
            <td>
                <button className="btn btn-success" onClick={()=> props.onSave(props.contact)}>Save</button>
                <button className="btn btn-danger" onClick={()=> props.onCancel(props.contact.name)} >Cancel</button>
            </td>
        </tr>
    );
}

export default EditContact;