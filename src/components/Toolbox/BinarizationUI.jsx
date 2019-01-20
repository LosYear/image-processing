import React from 'react';
import { connect } from 'react-redux';
import { applyAdaptiveBinarization } from '../../actions';

class BinarizationUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      c: 7,
      radius: 3
    };
  }

  render() {
    const { c, radius } = this.state;

    return (
      <div>
        <div className="toolbox-number-group">
          <input
            className="toolbox-input"
            type="number"
            min="3"
            max="15"
            step="2"
            value={radius}
            onChange={e => this.setState({ radius: e.target.value })}
          />
          <input
            className="toolbox-input"
            type="number"
            step="1"
            value={c}
            styles={{width: 50}}
            onChange={e => this.setState({ c: e.target.value })}
          />
          <button
            className="toolbox-button"
            onClick={() =>
              this.props.applyAdaptiveBinarization(
                parseInt(radius * radius, 10),
                parseInt(c, 10)
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { applyAdaptiveBinarization }
)(BinarizationUI);
