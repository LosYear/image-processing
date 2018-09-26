import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './TooltippedSlider.scss';

class TooltippedSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue || 0
        }
    }


    render() {
        const props = this.props;
        return <div className="tooltipped-slider">
            <Slider {...props} onChange={(value) => {
                this.setState({value});
                props.onChange && props.onChange(value);
            }}/> <span className="tooltipped-slider__tip"
                       onClick={() => props.onAfterChange && props.onAfterChange(this.state.value)}>{this.state.value}</span>
        </div>;
    }
}

export default TooltippedSlider;