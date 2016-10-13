import React from 'react';
import { connect } from 'react-redux';
import { Write } from 'components';

class Home extends React.Component {
    render() {
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? <Write/> : undefined }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    };
};

export default connect(mapStateToProps)(Home);