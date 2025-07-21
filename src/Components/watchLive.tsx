import { useEffect, useRef } from "react";
import Peer from "peerjs";
import { useSearchParams } from "react-router-dom";

const WatchLive = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [params] = useSearchParams();

useEffect(() => {
  const peer = new Peer();

  peer.on("open", (id) => {
    console.log("👁️ Viewer ID:", id);

    const hostPeerId = params.get("peerId");

    if (!hostPeerId) {
      console.error("❌ peerId missing in URL");
      return;
    }

    console.log("📞 Calling host:", hostPeerId);

    // ✅ This will only work if the host is actually online
    const call = peer.call(hostPeerId, undefined as any);

    console.log("Call:", call); // << Check this
    if (!call) {
      console.error("❌ Call creation failed");
      return;
    }

    call.on("stream", (remoteStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = remoteStream;
        videoRef.current.play().catch((err) => console.error("Autoplay error:", err));
      }
    });

    call.on("error", (err) => {
      console.error("❌ Call error:", err);
    });
  });

  peer.on("error", (err) => {
    console.error("❌ PeerJS error:", err);
  });

  return () => {
    peer.disconnect();
    peer.destroy();
  };
}, [params]);

  return (
    <div>
      <h2>👁️ Live Viewer</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        style={{ width: "100%", maxWidth: "800px", backgroundColor: "#000" }}
      />
    </div>
  );
};

export default WatchLive;
