import React from 'react';
import {calcCanvasIndex, putPixelToCanvas} from "../../helpers/canvas";

class Histogram extends React.PureComponent {
    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw = () => {
        const {data} = this.props;

        if (!data) {
            return;
        }

        const color = this.props.color || 0;
        const canvas = this.refs.canvas;
        const canvasContext = canvas.getContext('2d');
        const canvasData = canvasContext.createImageData(canvas.width, canvas.height);
        const maxValue = Math.max(255, Math.max(...data));

        data.forEach((el, index) => {
            const val = Math.floor(255 * ((maxValue - el) / maxValue)); // Scale values and reverse as (0, 0) is top left corner
            const pixelIndex = calcCanvasIndex(index, val, canvas.width);
            putPixelToCanvas(canvasData.data, pixelIndex, color);
        });

        canvasContext.putImageData(canvasData, 0, 0);
    };

    render() {
        return <canvas ref="canvas" width={256} height={256}/>;
    }
}

export default Histogram;