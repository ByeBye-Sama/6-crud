import '../styles/index.scss';
import Modal from './ui/modal';

function popOutModal() {
  const popOutButton = document.querySelector('.js_popOutButton');
  popOutButton.addEventListener('click', () => {
    const modal = new Modal({
      element: document.querySelector('.js_modal'),
    });
    modal.open();
  });
}
popOutModal();
