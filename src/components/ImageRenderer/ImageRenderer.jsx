import React from 'react';
import {getFilename} from "../../selectors/image";
import {connect} from 'react-redux';
import './ImageRenderer.scss';

class ImageRenderer extends React.Component {
    componentDidMount() {
        this.drawImage();
    }

    componentDidUpdate() {
        this.drawImage();
    }

    drawImage = () => {
        const canvas = this.refs.canvas;
        const canvasContext = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            console.log(canvas.width, canvas.height);

            canvas.width = img.width;
            canvas.height = img.height;
            canvasContext.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = this.props.image;
    };

    render() {
        return <canvas ref="canvas"/>;
    }
}

function mapStateToProps(state) {
    return {
        image: getFilename(state)
    };
}

export default connect(mapStateToProps)(ImageRenderer);
