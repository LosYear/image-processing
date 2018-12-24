import React from 'react';
import { connect } from 'react-redux';
import { getFilename } from '../../selectors/image';
import './ImageRenderer.scss';
import { drawFileOnCanvas } from '../../helpers/canvas';
import RegionSelect from '../RegionSelect/RegionSelect';

class ImageRenderer extends React.PureComponent {
  componentDidMount() {
    this.drawImage();
  }

  componentDidUpdate() {
    this.drawImage();
  }

  drawImage = () => {
    drawFileOnCanvas(this.refs.canvas, this.props.image);
  };

  render() {
    return (
      <div className="image-display">
        <RegionSelect>
          <canvas ref="canvas" />
        </RegionSelect>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    image: getFilename(state)
  };
}

export default connect(mapStateToProps)(ImageRenderer);
