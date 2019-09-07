import React from 'react';
import CustomCard from '../cards/CustomCard';
import './UserView.css';

class UserView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="row justify-content-between" style={{marginTop: "17%", marginLeft: "10%", marginRight: "10%"}}>
                <CustomCard name="fa-truck"/>

                <CustomCard name="fa-user-slash"/>

                <CustomCard name="fa-exclamation-triangle"/>
            </div>
        );
    }

}

export default UserView;