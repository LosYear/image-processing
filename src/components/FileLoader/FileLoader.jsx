import React from 'react';
import './FileLoader.scss';
import Dropzone from 'react-dropzone'
import Icon from './icon.js.svg';
import {connect} from 'react-redux';
import {chooseFile} from "./../../actions";

class FileLoader extends React.Component {
    dropHandler = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const localURL = window.URL.createObjectURL(file);

        this.props.chooseFile(localURL);
    };

    render() {
        return <Dropzone accept={['image/png', 'image/jpeg', 'image/bmp', 'image/gif']} multiple={false}
                         className="file-loader" rejectClassName="file-loader_rejected"
                         acceptClassName="file-loader_accepted"
                         onDrop={this.dropHandler}
        >
            <p>Перетащите файлы или <b>нажмите</b> для выбора файла</p>
            <Icon/>
        </Dropzone>;
    }
}

export default connect(null, {chooseFile})(FileLoader);