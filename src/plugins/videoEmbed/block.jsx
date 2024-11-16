"use client"
import React, { useState } from 'react';

const VideoEmbedBlock = ({ url, width, height, onChange }) => {
  const [videoUrl, setVideoUrl] = useState(url);

  const handleChange = (e) => {
    setVideoUrl(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="video-embed-block">
      <input
        type="text"
        value={videoUrl}
        onChange={handleChange}
        placeholder="Enter video URL"
        className="video-url-input"
      />
      {videoUrl && (
        <iframe
          src={videoUrl}
          width={width}
          height={height}
          title="Video Embed"
          frameBorder="0"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default VideoEmbedBlock;
