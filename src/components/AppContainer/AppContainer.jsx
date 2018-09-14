import React, {Component} from 'react';
import './AppContainer.scss';
import {getFilename} from "../../selectors/file";
import {connect} from 'react-redux';
import FileLoader from "../FileLoader/FileLoader";

class AppContainer extends Component {
    render() {
        const {filename} = this.props;

        if (!filename) {
            return <FileLoader/>;
        }

        return (
            <div>{this.props.filename}</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filename: getFilename(state)
    }
}

export default connect(mapStateToProps)(AppContainer);
