import React from 'react';
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');


  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      title,
      link
    });
  }



  return (
    <PopupWithForm name='addCard' title='Новое место' buttonTitle='Создать' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input onChange={handleTitleChange} value={title} minLength="2" maxLength="30" name="title" id="title" type="text" className="popup__input popup__input_type_title"
        placeholder="Название" required />
      <span className="title-input-error popup__form-input-error"></span>
      <input onChange={handleLinkChange} value={link} name="photo" id="photo" type="url" className="popup__input popup__input_type_photo"
        placeholder="Ссылка на картинку" required />
      <span className="photo-input-error popup__form-input-error"></span>
    </PopupWithForm>
  );


}

export default AddPlacePopup;
