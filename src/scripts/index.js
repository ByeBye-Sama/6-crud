import '../styles/index.scss';
import Modal from './ui/modal';
import addUser from './components/user';

function popOutModal() {
  const popOutButton = document.querySelector('.js_popOutButton');
  popOutButton.addEventListener('click', () => {
    const modal = new Modal({
      element: document.querySelector('.js_modal'),
      callbackAcept: addUser
    });
    modal.open();
  });
}
popOutModal();
