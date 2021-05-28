import '../index.css';
import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import Register from './Register.js'
import Login from './Login.js'
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, withRouter } from "react-router-dom";
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/authApi';




function App(props) {
  const [editProfilePopupOpen, isEditProfilePopupOpen] = React.useState(false);
  const [editAvatarPopupOpen, isEditAvatarPopupOpen] = React.useState(false);
  const [addPlacePopupOpen, isAddPlacePopupOpen] = React.useState(false);
  const [infoTooltipPopupOpen, isInfoTooltipPopupOpen] = React.useState(false);
  const [selectCard, selectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState(null);
  const [regResult, setRegResult] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      authApi.jwtCheck(jwt).then((res) => {
        if (res) {
          console.log(res)
          localStorage.setItem('_id', res.data._id);
          localStorage.setItem('email', res.data.email);
          // авторизуем пользователя
          setLoggedIn(true)
          props.history.push("/");

          return res
        }
      });
    };
  }, [])


  React.useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result)
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then((result) => {
        setCurrentUser(result);
        console.log(result)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  }, []);

  function handleCardClick(card) {
    selectedCard(card)
    console.log(card)
  }

  function handleEditAvatarClick() {
    isEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    isEditProfilePopupOpen(true)

  }


  function handleAddPlaceClick() {
    isAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    selectedCard(null)
    isAddPlacePopupOpen(false)
    isInfoTooltipPopupOpen(false)
    isEditProfilePopupOpen(false)
    isEditAvatarPopupOpen(false)
  }
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        console.log(res)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  function handleRegResult(result) {
    isInfoTooltipPopupOpen(true)
    if (result === 201) {
      setRegResult(true)
    } else { setRegResult(false) }

  }
  function handleLogin() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      authApi.jwtCheck(jwt).then((res) => {
        if (res) {
          console.log(res)
          localStorage.setItem('_id', res.data._id);
          localStorage.setItem('email', res.data.email);
          // авторизуем пользователя
          setLoggedIn(true)
          props.history.push("/");

          return res
        }
      });
    };
  }

  const handleCardLike = (card) => {
    console.log(card.likes.some(i => i._id === currentUser._id))
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      console.log(newCard)
      setCards(
        cards.map((c) => c._id === card._id ? newCard : c)
      )
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter((c) => c._id !== card._id)
        )
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  const handleAddPlaceSubmit = (card) => {
    api.addCard(card.title, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  // const tokenCheck = () => {
  //   // если у пользователя есть токен в localStorage,
  //   // эта функция проверит, действующий он или нет
  //   if (localStorage.getItem('jwt')){
  //     let jwt = localStorage.getItem('jwt');
  //     authApi.jwtCheck(jwt).then((res) => {
  //       if (res){
  //         console.log(res)
  //         localStorage.setItem('_id', res.data._id);
  //         localStorage.setItem('email', res.data.email);
  //                 // авторизуем пользователя
  //         handleLogin()
  //         props.history.push("/");

  //        return res
  //       }
  //     });
  //   };
  //   }

  return (
    <CurrentUserContext.Provider value={currentUser}>



      <div className="root">
        <div className="page">
          <Header loggedIn={loggedIn} email={localStorage.getItem('email')} setLoggedIn={setLoggedIn} />
          <Switch>
            <Route path="/sign-up">
              <Register handleRegResult={handleRegResult} />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route exact path="/">
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards === null ? [] : cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
              />
              {/* <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards === null ? [] : cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
          /> */}
            </Route>
          </Switch>

          <Footer />
          <EditProfilePopup isOpen={editProfilePopupOpen ? true : false} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={editAvatarPopupOpen ? true : false} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={addPlacePopupOpen ? true : false} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <InfoTooltip isOpen={infoTooltipPopupOpen} onClose={closeAllPopups} result={regResult} />
          <PopupWithForm name='Confirm' title='Вы уверены?' buttonTitle='Да' onClose={closeAllPopups} />
          <ImagePopup card={selectCard} onClose={closeAllPopups} />
        </div>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
