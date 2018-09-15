import React from 'react';
import {getFilename} from "../../selectors/file";
import {connect} from 'react-redux';
import Loader from "../Loader/Loader";

class ImageRenderer extends React.Component {
    componentDidMount() {
        //this.drawImage();
    }

    componentDidUpdate() {
        //this.drawImage();
    }

    drawImage = () => {
        const canvas = this.refs.canvas;
        const canvasContext = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            console.log(canvas.width, canvas.height);
            canvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        };
        img.src = this.props.image;
    };

    render() {
        return <Loader/>;

        return <canvas ref="canvas" width={300} height={300}/>;
    }
}

function mapStateToProps(state) {
    return {
        image: getFilename(state)
    };
}

export default connect(mapStateToProps)(ImageRenderer);