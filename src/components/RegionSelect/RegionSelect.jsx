import React from 'react';
import ReactRegionSelect from 'react-region-select';
import { connect } from 'react-redux';
import { setSelectedRegions } from './../../actions';
import {
  getRegions,
  getRegionsSelectDisabled,
  getRotationCenterPoint,
  getRotationCenterType
} from '../../selectors/region';
import './RegionSelect.scss';

class RegionSelect extends React.PureComponent {
  render() {
    const { disabled, centerType, center } = this.props;

    return (
      <ReactRegionSelect
        maxRegions={1}
        regions={disabled ? [] : this.props.regions}
        onChange={this.props.setSelectedRegions}
        constraint
        regionStyle={{ zIndex: 1 }}
      >
        {centerType === 'arbitrary' && (
          <div
            className="region-point"
            style={{ top: center.y + '%', left: center.x + '%' }}
          />
        )}
        {this.props.children}
      </ReactRegionSelect>
    );
  }
}

function mapStateToProps(state) {
  return {
    regions: getRegions(state),
    disabled: getRegionsSelectDisabled(state),
    center: getRotationCenterPoint(state),
    centerType: getRotationCenterType(state)
  };
}

export default connect(
  mapStateToProps,
  { setSelectedRegions }
)(RegionSelect);
