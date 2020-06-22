import http from './http';
import ui from './ui';

document.addEventListener('DOMContentLoaded', getContacts);

document.getElementById('contacts').addEventListener('click', deleteContact);

document.getElementById('submit_contact').addEventListener('click',submitContact);

document.getElementById('contacts').addEventListener('click', editContact);

document.getElementById('contact_form').addEventListener('click', cancelUpdate);


function getContacts() {
    http.get('http://localhost:3000/contacts')
        .then(contacts => {
            ui.paint(contacts);
        }).catch(() => {
            ui.showAlert('Something Wrong!','alert-warning');
        });
}

function submitContact(e) {
    e.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phone').value;
    let id = document.getElementById('id').value
    let phone = Number(phoneNumber);
    if (firstName === '' || lastName === '' || email === '' || phoneNumber === '' || Boolean(phone) == false) {
        ui.showAlert('Empty Fields Not Allowed!','alert-danger');
    } else {
        const data = {
            firstName, lastName, email, phone
        };
        if (id === '') {
            http.post('http://localhost:3000/contacts', data)
                .then(() => {
                    // console.log(data);
                    ui.showAlert('Contact Added!','alert-primary');
                    ui.clearFields();
                    getContacts();
            })
        } else {
            http
                .update(`http://localhost:3000/contacts/${id}`, data)
                .then(() => {
                    ui.showAlert('Contact Updated!','alert-success');
                    ui.clearFields();
                    ui.changeState('add');
                    getContacts();
            })
        }
    }
}

function deleteContact(e) {
    if (e.target.parentElement.id === 'delete') {
        const id = e.target.parentElement.dataset.id;
        // console.log(id);
        http.deleteData(`http://localhost:3000/contacts/${id}`)
            .then(() => {
                ui.showAlert('Contact Deleted','alert-danger');
                getContacts();
            }).catch(() => {
                ui.showAlert('Delete Failed!','alert-danger');
        })
    }
}

function editContact(e) {
    if (e.target.parentElement.id === 'edit') {
        const id = e.target.parentElement.dataset.id;
        http
            .get(`http://localhost:3000/contacts/${id}`)
            .then(data => {
                // console.log(data);
                ui.fillForm(data);
                ui.handleBtn();
        })
    }
}

function cancelUpdate(e) {
    if (e.target.id === 'cancel') {
        ui.changeState('add');
        ui.clearFields();   
    }
    e.preventDefault();
}