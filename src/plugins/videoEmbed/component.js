import React from 'react';

const VideoEmbedComponent = ({ videoUrl }) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="Embedded video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoEmbedComponent;
