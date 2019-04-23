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
  const close = this.element.querySelectorAll('.js_closeOutButton');
  for (let i = 0; i < close.length; i += 1) {
    close[i].addEventListener('click', () => {
      console.log('close');
    });
  }
};
