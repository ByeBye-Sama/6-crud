import Modal from '../ui/modal';

export default function addUser() {
  addDom(makeCard(getRef().values));
  console.log("other");
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
    deleteCard(card);
  }
  console.log("something");

  return card;
}

function makeCardHtml(value) {
  return `
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
  console.log('value', value)
  for (const ref in refs) {
    console.log('ref', refs);
    console.log('refs[ref]', refs[ref])
    console.log('refs[ref].value', refs[ref].value)
    console.log('value[ref]', value[ref])
    refs[ref].value = value[ref]
  };

  const modal = new Modal({
    element: document.querySelector('.js_modal'),
    callbackAcept: () => {
      setValues(div)
    }
  })
  modal.edit();
}

function deleteCard(div) {
  const sure = confirm("Are you sure?");
  if (sure == true) {
    div.remove();
  }
}
