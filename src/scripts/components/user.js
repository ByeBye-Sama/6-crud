import Modal from '../ui/modal';

const dbase = "http://localhost:3000/users"
const publicKey = "$2a$10$G/R/PKN67hkIWVzNN2JZ8OkMS282LFUXWlx2GpLlychiVkbDMWVfy" 

/* https://my-json-server.typicode.com/byebye-sama/server-local-test/users cloud db */
/* http://localhost:3000/users local db */
/* https://api.jsonbin.io/b/5cc3a862f1172a287e1fe330/latest */

export function addUser() {
  setData(getRef().values).then(response => addDom(makeCard(response)));
  console.log("other");
}

export async function getData() {
  const response = await fetch(dbase)
  const responseJson = await response.json();

  responseJson.forEach(values => {
    addDom(makeCard(values));
  });
}

async function setData(values) {
  console.log("this work?", values);
  const response = await fetch(dbase, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "secret-key": publicKey,
    }
  })
  return response;
}

async function deleteData(id) {
  fetch(`${dbase}/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "secret-key": publicKey,
      "private": "false"
    }
  })
}

async function editData(id) {
  const {values} = getRef()
  const  response = await fetch(`${dbase}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "secret-key": publicKey,
      "private": "false"
    }
  })
  return response;
}


function getRef() {
  const refs = {
    firstName: document.querySelector('.js_modal').querySelector('[data-form="firstname"]'),
    lastName: document.querySelector('.js_modal').querySelector('[data-form="lastname"]'),
    email: document.querySelector('.js_modal').querySelector('[data-form="email"]'),
    phone: document.querySelector('.js_modal').querySelector('[data-form="phone"]'),
    country: document.querySelector('.js_modal').querySelector('select[data-form="country"]'),
    photoURL: document.querySelector('.js_modal').querySelector('[data-form="photoURL"]'),
    about: document.querySelector('.js_modal').querySelector('[data-form="about"]')
  }

  const values = {
    firstName: refs.firstName.value,
    lastName: refs.lastName.value,
    email: refs.email.value,
    phone: refs.phone.value,
    country: refs.country.value,
    photoURL: refs.photoURL.value,
    about: refs.about.value
  }

  return {
    refs,
    values
  };
}

function setValues(element) {
  const { values: value } = getRef();
  element.innerHTML = makeCardHtml(value);

  element.querySelector('.js_edit').onclick = () => {
    editUser(element, value);
  };

  element.querySelector('.js_delete').onclick = () => {
    deleteCard(element);
  }
}

function makeCard(value) {

  const card = document.createElement('div');
  card.innerHTML = makeCardHtml(value)

  card.querySelector('.js_edit').onclick = () => {
    editUser(card, value);
  };

  card.querySelector('.js_delete').onclick = () => {
    deleteCard(card, value.id);
  }
  console.log("something");

  return card;
}

function makeCardHtml(value) {
  return `
  <input type="hidden" value="${value.id}"/>
  <div class="card">
    <img src="${value.photoURL}" class="card-img-top img-user">
    <div class="card-body">
      <h5 class="card-title">${value.firstName} ${value.lastName}</h5>
      <p class="card-text m-1">${value.about}</p>
      <p class="card-text m-0 little-text">Contact Email: ${value.email}</p>
      <p class="card-text m-0 little-text">Country: ${value.country}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Phone: ${value.phone}</small>
    </div>
    <button type="button" class="btn btn-warning js_edit">Edit</button>
    <button type="button" class="btn btn-danger js_delete">Delete</button>
  </div>`;
}

function addDom(element) {
  const div = document.querySelector('.js_newContent')
  div.appendChild(element);
}

function editUser(div, value) {
  const { refs } = getRef();
  for (const ref in refs) {
    refs[ref].value = value[ref]
  };

  console.log('value', value)
  const modal = new Modal({
    element: document.querySelector('.js_modal'),
    callbackAcept: () => {
      setValues(div);
      editData(value.id); 
    }
  })
  modal.edit();
}

function deleteCard(div, id) {
  const sure = confirm("Are you sure?");
  if (sure == true) {
    div.remove();
    deleteData(id);
  }
}
