import { useEffect, useState } from 'react';
import ReelPlayer from '../components/ReelPlayer';

export default function Home() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    fetch('/api/reels')
      .then((res) => res.json())
      .then((data) => setReels(data));
  }, []);

  return (
    <div className="overflow-y-scroll h-screen snap-y snap-mandatory">
      {reels.map((reel, idx) => (
        <div key={idx} className="snap-start">
          <ReelPlayer reel={reel} />
        </div>
      ))}
    </div>
  );
}
