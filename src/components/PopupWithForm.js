import React from 'react';


class PopupWithForm extends React.Component {
  render() {
    return (
      <div className={`popup popup_type_${this.props.name} ${this.props.isOpen ? 'popup_active' : ''}`} id={this.props.name}>
        <div className="popup__container">
          <button onClick={this.props.onClose} className="popup__close" type="button" id={`close${this.props.name}`} aria-label="Закрыть"></button>
          <h2 className="popup__title">{this.props.title}</h2>
          <form className="popup__form" name={this.props.name} id={this.props.name} noValidate onSubmit={this.props.onSubmit}>
            {this.props.children}
            <button type="submit" className="popup__submit-button">{this.props.buttonTitle}</button>
          </form>
        </div>
      </div>
    )
  };


}

export default PopupWithForm;
