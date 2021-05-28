import React from 'react';
import Card from './Card.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'



function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(props.onCardClick)
  console.log(props.cards)
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать" ></button>
          </div>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить"></button>
      </section>
      <section className="elements">
        {props.cards.map((item, i) => (
          <Card card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={item._id} />
        ))}

      </section>
    </main>
  )
}

export default Main;
