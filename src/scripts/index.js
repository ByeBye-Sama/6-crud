import '../styles/index.scss';
import Modal from './ui/modal';
import { addUser, getData } from './components/user';

getData();
function popOutModal() {
  const popOutButton = document.querySelector('.js_popOutButton');
  popOutButton.addEventListener('click', () => {
    const modal = new Modal({
      element: document.querySelector('.js_modal'),
      callbackAcept: addUser,
    });
    modal.open();
  });
}
popOutModal();
