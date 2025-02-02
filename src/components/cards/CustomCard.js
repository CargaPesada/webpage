import React from 'react';
import './CustomCard.css';

class CustomCard extends React.Component {
	render() {
		return (
			<div className="col-sm-1 col-md-3 bg-light card p-3" onClick={this.props.customOnClick}>
				<i className={`fas ${this.props.name} fa-5x mx-auto pt-4`} />
				<div className="card-body mx-auto">{`${this.props.description}`}</div>
			</div>
		);
	}
}

export default CustomCard;
