import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import '../App.css';

const OBSVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [peerId, setPeerId] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prevLogs => [`[${timestamp}] ${message}`, ...prevLogs]);
  };

useEffect(() => {
  const peer = new Peer(); // Optionally pass { host, port, path } for custom server

  peer.on('open', id => {
    setPeerId(id);
    log(`Your Peer ID: ${id}`);
  });

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Answer incoming viewer call with the stream
      peer.on('call', call => {
        call.answer(stream);
        log(`Incoming call from ${call.peer}, sending stream...`);
      });
    })
    .catch(err => {
      console.error('Error accessing media devices:', err);
      log(`Error: ${err.message}`);
    });

  return () => {
    peer.disconnect();
    peer.destroy();
  };
}, []);


  const handleFullscreen = () => {
    const video: any = videoRef.current;
    if (video) {
      video.requestFullscreen?.() ||
        video.webkitRequestFullscreen?.() ||
        video.mozRequestFullScreen?.() ||
        video.msRequestFullscreen?.() ||
        alert('Fullscreen not supported');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🎥 OBS Virtual Camera Viewer</h1>
      </header>

      <main>
        <div className="video-wrapper">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', maxWidth: 800 }}
          />
          <button onClick={handleFullscreen}>🔲 Fullscreen</button>
        </div>

        <section className="log-panel">
          <h2>📋 Logs</h2>
          <p>📡 Share this link to view stream:</p>
          <code>
            {window.location.origin}/Live?peerId={peerId}
          </code>

          <div className="log-messages">
            {logs.map((logEntry, index) => (
              <div key={index} className="log-entry">
                {logEntry}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OBSVideo;
