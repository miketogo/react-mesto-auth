import React from 'react';


class ImagePopup extends React.Component {
  render() {
    console.log(`cardochka ${this.props.card}`)
    return (
      <div className={`popup ${this.props.card === null ? '' : 'popup_active'}`} id="Image">
        <div className="popup__container popup__container_type_image">
          <button onClick={this.props.onClose} className="popup__close" type="button" id="closeImage" aria-label="Закрыть"></button>
          <img className="popup__image" src={this.props.card === null ? '' : this.props.card.link} alt={this.props.card === null ? '' : this.props.card.name} />
          <h2 className="popup__title popup__title_type_image">{this.props.card === null ? '' : this.props.card.name}</h2>
        </div>
      </div>
    )
  };


}

export default ImagePopup;
