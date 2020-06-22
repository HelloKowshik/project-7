class UI{
    constructor() {
        this.contactInput = document.getElementById('contacts');
        this.firstNameInput = document.getElementById('firstName');
        this.lastNameInput = document.getElementById('lastName');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.contactSubmit = document.  getElementById('submit_contact');
        this.contactForm = document.getElementById('contact_form');
        this.formEnd = document.getElementById('form_end');
        this.idInput = document.getElementById('id');
        this.container = document.getElementById('container');
    }
    paint(contacts) {
        let output = '';
        contacts.forEach(contact => { 
            let { id, firstName, lastName, email, phone } = contact;
            output += `
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">${firstName} ${lastName}</h5>
            <p class="card-text">${phone}</p>
              <p class="card-text">${email}</p>
              <a href="#" id="edit" data-id="${id}" class="mr-3"><i class="fas fa-pencil-alt"></i></a>
              <a href="#" id="delete" data-id="${id}"><i class="fas fa-trash-alt"></i></a>
            </div>
          </div>
            `;
        });
        this.contactInput.innerHTML = output;
    }
    clearFields() {
        this.firstNameInput.value = '';
        this.lastNameInput.value = '';
        this.emailInput.value = '';
        this.phoneInput.value = '';
  }
  fillForm(contacts) {
        const { firstName, lastName, email, phone ,id} = contacts;
        this.firstNameInput.value = firstName;
        this.lastNameInput.value = lastName;
        this.emailInput.value = email;
        this.phoneInput.value = phone;
        this.idInput.value = id;
  }
  handleBtn() {
        this.contactSubmit.textContent = 'Update Contact';
        this.contactSubmit.classList.remove('btn-primary');
        this.contactSubmit.classList.add('btn-warning');
        this.addCancleBtn();
        
  }
  addCancleBtn() {
        let btn = document.createElement('button');
        btn.className = "btn btn-block btn-success";
        btn.id = 'cancel';    
        btn.textContent = 'Cancel';
        this.contactForm.insertBefore(btn, this.formEnd);
  }
  changeState(state) {
    if (state === 'add') {
      if (document.getElementById('cancel')) {
        document.getElementById('cancel').remove(); 
      }
      this.contactSubmit.textContent = 'Save Contact';
      this.idInput.value = '';
      this.contactSubmit.classList.add('btn-primary');
      this.contactSubmit.classList.remove('btn-warning');
    }
  }
  showAlert(msg, className) {
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.innerHTML = msg;
    this.container.insertBefore(div, this.contactInput);
    setTimeout(() => {
      this.clearAlert()
    }, 2000);
  }
  clearAlert() {
    if (document.querySelector('.alert')) {
      document.querySelector('.alert').remove();
    }
  }
}

const ui = new UI();
export default ui;