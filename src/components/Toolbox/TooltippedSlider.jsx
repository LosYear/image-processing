import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './TooltippedSlider.scss';

class TooltippedSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || 0
    };
  }

  render() {
    const props = this.props;

    const Component = props.range ? Slider.Range : Slider;

    return (
      <div className="tooltipped-slider">
        <Component
          {...props}
          onChange={value => {
            this.setState({ value });
            props.onChange && props.onChange(value);
          }}
        />
        <span
          className="tooltipped-slider__tip"
          onClick={() =>
            props.handleClick && props.handleClick(this.state.value)
          }
        >
          {props.range
            ? `${this.state.value[0]} .. ${this.state.value[1]}`
            : this.state.value}
        </span>
      </div>
    );
  }
}

export default TooltippedSlider;
