import React from 'react';
import FileLoader from '../FileLoader/FileLoader';
import ImageRenderer from '../ImageRenderer/ImageRenderer';
import './ImageBox.scss';

class ImageBox extends React.Component {
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
  }

  render() {
    const { filename } = this.props;

    return (
      <div className="image-box" ref={this.containerRef}>
        {filename ? (
          <ImageRenderer parentRef={this.containerRef} />
        ) : (
          <FileLoader />
        )}
      </div>
    );
  }
}

export default ImageBox;
