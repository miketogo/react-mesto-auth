import React from 'react';








class InfoTooltip extends React.Component {
  render() {
    return (
      <div className={`popup ${!this.props.isOpen ? '' : 'popup_active'}`} id="infoTooltip">
        <div className="popup__container popup__container_type_infoTooltip">
          <button onClick={this.props.onClose} className="popup__close" type="button" id="closeInfoTooltip" aria-label="Закрыть"></button>
          <div className={`popup__infoTooltip-icon ${this.props.result ? 'popup__infoTooltip-icon_good' : 'popup__infoTooltip-icon_bad'}`} />
          <h2 className="popup__title popup__title_type_infoTooltip">{this.props.result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </div>
      </div>
    )
  };


}

export default InfoTooltip;
