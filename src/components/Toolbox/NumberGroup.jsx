import React from 'react';
import './NumberGroup.scss';

class NumberGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue || ''
        }
    }

    onChange = (event) => {
        this.setState({value: event.target.value});
    };

    render() {
        const {min, max, handleClick, step} = this.props;
        const {value} = this.state;

        return <div className="toolbox-number-group">
            <input className="toolbox-input" type="number" min={min} max={max} value={value} step={step}
                   onChange={this.onChange}/>
            <button className="toolbox-button" onClick={() => handleClick(value)}/>
        </div>
    }
}

NumberGroup.defaultProps = {
    min: 0,
    max: null
};

export default NumberGroup;