import React from 'react';
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {
  const inputRef = React.useRef();
  // inputRef.current.value
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(
      inputRef.current.value,
    );
  }



  return (
    <PopupWithForm name='editAvatar' title='Обновить аватар' buttonTitle='Сохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={inputRef} name="avatar" id="avatar" type="url" className="popup__input popup__input_type_avatar"
        placeholder="Ссылка на картинку" required />
      <span className="avatar-input-error popup__form-input-error"></span>
    </PopupWithForm>
  );


}

export default EditAvatarPopup;
