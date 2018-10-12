import React from 'react';

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
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        const maxValue = Math.max(255, Math.max(...data));
        canvasContext.fillStyle = color;

        data.forEach((el, index) => {
            const val = Math.floor(255 * ((maxValue - el) / maxValue)); // Scale values and reverse as (0, 0) is top left corner
            canvasContext.fillRect(index, val, 1, 255 - val);
        });
    };

    render() {
        return <canvas ref="canvas" width={256} height={256}/>;
    }
}

export default Histogram;