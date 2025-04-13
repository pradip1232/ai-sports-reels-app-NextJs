import React from 'react';
import ReactPlayer from 'react-player';

const ReelPlayer = ({ reel }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <ReactPlayer
        url={reel.url}
        playing
        loop
        controls
        width="100%"
        height="100%"
      />
      <div className="absolute bottom-10 left-5 text-white">
        <h2 className="text-xl font-bold">{reel.athlete}</h2>
        <p>{reel.script}</p>
      </div>
    </div>
  );
};

export default ReelPlayer;
