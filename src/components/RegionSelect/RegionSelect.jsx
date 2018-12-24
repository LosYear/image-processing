import React from 'react';
import ReactRegionSelect from 'react-region-select';
import { connect } from 'react-redux';
import { setSelectedRegions } from './../../actions';

class RegionSelect extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { disabled } = this.props;
    return (
      <ReactRegionSelect
        maxRegions={1}
        regions={disabled ? [] : this.props.regions}
        onChange={this.props.setSelectedRegions}
        constraint
        regionStyle={{ zIndex: 1 }}
        style={{ width: '100%', height: '100%' }}
      >
        {this.props.children}
      </ReactRegionSelect>
    );
  }
}

function mapStateToProps(state) {
  return {
    regions: state.region.regions,
    disabled: state.region.disabled
  };
}

export default connect(
  mapStateToProps,
  { setSelectedRegions }
)(RegionSelect);
