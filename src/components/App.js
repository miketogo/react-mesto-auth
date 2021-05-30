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
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [selectCard, selectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState(null);
  const [regResult, setRegResult] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      let jwt = localStorage.getItem('jwt');
      authApi.jwtCheck(jwt).then((res) => {
        console.log(res)
        localStorage.setItem('_id', res.data._id);
        localStorage.setItem('email', res.data.email);
        setUserEmail(res.data.email)
        // авторизуем пользователя
        setLoggedIn(true)
        props.history.push("/");
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    };
  }, [])


  React.useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result)
      }).catch((err) => {
        console.log(err);
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
    setEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)

  }


  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    selectedCard(null)
    setAddPlacePopupOpen(false)
    setInfoTooltipPopupOpen(false)
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpen(false)
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
    setInfoTooltipPopupOpen(true)
    setRegResult(result)


  }
  function handleLogin(email, password) {
    authApi.auth(email, password)
      .then((data) => {
        console.log(data)
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          localStorage.removeItem('regEmail');
          setLoggedIn(true)
          setUserEmail(email)
          props.history.push('/')
        }
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleRegister(email, password) {
    authApi.register(email, password).then(() => {
      handleRegResult(true)
      props.history.push('/sign-in')
      localStorage.setItem('regEmail', email)
    }).catch((err) => {
      console.log(err)
      handleRegResult(false)
    });
  }

  const handleCardLike = (card) => {
    console.log(card.likes.some(i => i._id === currentUser._id))
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      console.log(newCard)
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
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
          <Header loggedIn={loggedIn} email={userEmail} setLoggedIn={setLoggedIn} />
          <Switch>
            <Route path="/sign-up">
              <Register handleRegResult={handleRegResult} onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
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
          <EditProfilePopup isOpen={isEditProfilePopupOpen ? true : false} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen ? true : false} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen ? true : false} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} result={regResult} />
          <PopupWithForm name='Confirm' title='Вы уверены?' buttonTitle='Да' onClose={closeAllPopups} />
          <ImagePopup card={selectCard} onClose={closeAllPopups} />
        </div>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
