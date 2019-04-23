export default function Modal(opt) {
  this.element = opt.element;
  this.addEvents();
}

Modal.prototype.open = function openModal() {
  this.element.classList.add('d-block');
};

Modal.prototype.close = function closeModal() {
  this.element.classList.remove('d-block');
};

Modal.prototype.addEvents = function addEvents() {
  const accept = this.element.querySelector('.js_acceptButton');
  accept.addEventListener('click', () => {
    const firstName = document.querySelector('.js_firstName').value;
    const lastName = document.querySelector('.js_lastName').value;
    const mail = document.querySelector('js_mail').value;
    const phone = document.querySelector('js_phone').value;
    const photoURL = document.querySelector('js_photoURL').value;
    const template = `
    <div class="card">
      <img src="${photoURL}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${firstName} ${lastName}</h5>
        <p class="card-text">My contact is:</p>
        <p class="card-text">Email: ${mail}</p>
        <p class="card-text">Number: ${phone}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>`;
    document.querySelector('js_newContent').innerHTML = template;
  });

  const close = this.element.querySelectorAll('.js_closeOutButton');
  for (let i = 0; i < close.length; i += 1) {
    close[i].addEventListener('click', () => {
      this.close();
    });
  }
};
