import React from 'react';
import FileLoader from "../FileLoader/FileLoader";
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import './ImageBox.scss';

class ImageBox extends React.Component {
    render() {
        const {filename} = this.props;

        return <div className="image-box">
            {filename ? <ImageRenderer/> : <FileLoader/>}
        </div>;
    }
}

export default ImageBox;