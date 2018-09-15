import React, {Component} from 'react';
import './AppContainer.scss';
import {getFilename} from "../../selectors/file";
import {connect} from 'react-redux';
import FileLoader from "../FileLoader/FileLoader";
import ImageRenderer from "../ImageRenderer/ImageRenderer";

class AppContainer extends Component {
    render() {
        const {filename} = this.props;

        if (!filename) {
            return <FileLoader/>;
        }

        return (
            <ImageRenderer/>
        );
    }
}

function mapStateToProps(state) {
    return {
        filename: getFilename(state)
    }
}

export default connect(mapStateToProps)(AppContainer);
