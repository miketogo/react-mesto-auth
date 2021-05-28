import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' buttonTitle='Сохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input minLength="2" maxLength="40" name="name" type="text" className="popup__input popup__input_type_name" value={name} onChange={handleNameChange} placeholder="Ваше имя" required />
      <span className="name-input-error popup__form-input-error"></span>
      <input minLength="2" maxLength="200" name="about" type="text" className="popup__input popup__input_type_job"
        value={description} onChange={handleDescriptionChange} placeholder="Ваша работа" required />
      <span className=" about-input-error popup__form-input-error"></span>
    </PopupWithForm>
  );


}

export default EditProfilePopup;
