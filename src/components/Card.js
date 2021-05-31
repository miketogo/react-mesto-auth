import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_type_visible' : 'element__trash_type_hidden'}`
  );
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`)

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    console.log(props.onCardDelete)
    props.onCardDelete(props.card)
  }


  return (
    <div key={props.card._id}>
      <div className="element">
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить"></button>
        <img onClick={handleClick} className="element__image" src={props.card.link} alt={props.card.name} />
        <div className="element__container">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Лайк"></button>
            <p className="element__like-coutner">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );


}

export default Card;
