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
    drawFileOnCanvas(this.refs.canvas, this.props.image).then(() => {
      // Blame on it me, this is essential for region selection to work properly
      const parent = this.props.parentRef.current.querySelector('div');
      parent.style.height = this.refs.canvas.clientHeight + 'px';
      parent.style.width = this.refs.canvas.clientWidth + 'px';
    });
  };

  render() {
    return (
      <RegionSelect>
        <canvas ref="canvas" />
      </RegionSelect>
    );
  }
}

function mapStateToProps(state) {
  return {
    image: getFilename(state)
  };
}

export default connect(mapStateToProps)(ImageRenderer);
