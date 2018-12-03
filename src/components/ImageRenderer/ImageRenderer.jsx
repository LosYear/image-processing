import React from 'react';
import { connect } from 'react-redux';
import { getFilename } from '../../selectors/image';
import './ImageRenderer.scss';
import { drawFileOnCanvas } from '../../helpers/canvas';

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
    return <canvas className="image-display" ref="canvas" />;
  }
}

function mapStateToProps(state) {
  return {
    image: getFilename(state)
  };
}

export default connect(mapStateToProps)(ImageRenderer);
