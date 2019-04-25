export default function Modal(opt) {
  this.element = opt.element;
  this.callback = opt.callbackAcept;
  this.initEvents();
}

Modal.prototype.open = function openModal() {
  const form = this.element.querySelector('form');
  this.element.classList.add('d-block');
  form.reset();
};

Modal.prototype.close = function closeModal() {
  this.element.classList.remove('d-block');
};

Modal.prototype.edit = function editModal() {
  this.element.classList.add('d-block');
};

Modal.prototype.accept = function (callback) {
  const form = this.element.querySelector('form');

  function submit(e) {
    e.preventDefault();
    this.close();
    callback();
  }
  form.onsubmit = submit.bind(this);
};

Modal.prototype.back = function closeModal() {
  const close = this.element.querySelectorAll('.js_closeOutButton');

  for (let i = 0; i < close.length; i += 1) {
    close[i].addEventListener('click', () => {
      this.close();
    });
  }
};

Modal.prototype.initEvents = function initEvents () {
  this.accept(this.callback);
  this.back();
}
