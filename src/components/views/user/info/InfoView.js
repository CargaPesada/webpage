import React from 'react';

class InfoView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let toRender = []

        for (let index in this.props.infosToShow) {
            toRender.push(
                <p>{this.props.infosToShow[index][0]}: {this.props.infosToShow[index][1]}</p>
            );
        }

        return (
            <div style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%", height: "5vh"}}>
                <div className="card bg-white row d-flex justify-content-center">
                    <div className="col-sm-4">
                        <h1 className="display-4 mx-auto pl-3 pr-3">{this.props.description}</h1>
                        <div className="mt-3">
                            {toRender}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default InfoView;