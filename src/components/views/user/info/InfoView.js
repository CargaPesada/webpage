import React from 'react';
import './InfoView.css';

class InfoView extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Método padrão de renderização.
     */
    render() {

        let toRender = []

        // Checando quais tipos de informação deversão ser renderizadas
        for (let index in this.props.infosToShow) {
            toRender.push(
                <p>{this.props.infosToShow[index][0]}: {this.props.infosToShow[index][1]}</p>
            );
        }

        return (
            <div className="card bg-white " style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", height: "80vh" }}>
                <a href="#" className="text-dark text-right" onClick={() => this.props.handleCard(false)} >
                    <i class="fas fa-2x fa-times-circle"></i>
                </a>
                <div className="row d-flex justify-content-center" style={{ width: "100%", height: "100%" }}>

                    {/* Coluna principal (a do meio) */}
                    <div className="col-sm-5">
                        <h1 className="display-4 text-center">{this.props.description}</h1>
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