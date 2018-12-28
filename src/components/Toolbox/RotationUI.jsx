import React from 'react';
import ActionLink from './ActionLink';
import NumberGroup from './NumberGroup';
import {
  getCurrentRegion,
  getRotationCenterPoint,
  getRotationCenterType
} from '../../selectors/region';
import { connect } from 'react-redux';
import {
  setRegionSelectDisabled,
  rotateRegion,
  setCenterPoint,
  setCenterType
} from '../../actions';
import './RotationUI.scss';

class RotationUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };

    this.handleAngleChange = this.handleAngleChange.bind(this);
    this.handleRotateClick = this.handleRotateClick.bind(this);
  }

  handleAngleChange(value) {
    this.setState({ angle: (Math.PI / 180) * parseInt(value, 10) });
  }

  handleRotateClick() {
    const {
      rotateRegion,
      selectedRegion,
      centerType,
      centerX,
      centerY
    } = this.props;
    const { angle } = this.state;

    if (!selectedRegion) {
      alert('Вы не указали регион');
      return;
    }

    const center =
      centerType === 'arbitrary' ? { x: centerX, y: centerY } : false;

    rotateRegion(selectedRegion, angle, center);
  }

  render() {
    const {
      centerX,
      centerY,
      centerType,
      setCenterType,
      setCenterPoint
    } = this.props;
    console.log(centerX, centerY);
    return (
      <div>
        <div className="expandable-container__row">
          <NumberGroup
            label="Угол"
            step={1}
            min={-360}
            max={360}
            handleChange={this.handleAngleChange}
          />
        </div>

        <div className="expandable-container__row">
          <div className="rotation-axis-select-group">
            <label>Ось</label>
            <select
              value={centerType}
              onChange={event => setCenterType(event.target.value)}
            >
              <option value="center">Центр</option>
              <option value="arbitrary">Произвольная</option>
            </select>
          </div>

          <div
            className="rotation-axis-coordinates-group"
            style={{
              visibility: centerType === 'arbitrary' ? 'visible' : 'hidden'
            }}
          >
            <label>X: </label>
            <input
              type="number"
              min={0}
              max={100}
              onChange={event =>
                setCenterPoint({ y: centerY, x: event.target.value })
              }
              value={centerX}
            />

            <label>Y: </label>
            <input
              type="number"
              min={0}
              max={100}
              onChange={event =>
                setCenterPoint({ x: centerX, y: event.target.value })
              }
              value={centerY}
            />
          </div>
        </div>

        <ActionLink title="Повернуть" handleClick={this.handleRotateClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedRegion: getCurrentRegion(state),
    centerType: getRotationCenterType(state),
    centerX: getRotationCenterPoint(state).x,
    centerY: getRotationCenterPoint(state).y
  };
}

export default connect(
  mapStateToProps,
  { rotateRegion, setRegionSelectDisabled, setCenterType, setCenterPoint }
)(RotationUI);
