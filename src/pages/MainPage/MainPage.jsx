import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appWindow } from "@tauri-apps/api/window";
import { motion } from "framer-motion";
import "./MainPage.css";

export default function MainPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [volumeValue, setVolumeValue] = useState(10);
  const navigate = useNavigate();
  const audioRef = React.useRef(new Audio("/assets/music/tilitili.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = volumeValue / 100;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.error("Autoplay failed", err);

        const startAudioOnInteraction = async () => {
          try {
            await audio.play();
            document.removeEventListener("click", startAudioOnInteraction);
            document.removeEventListener("keydown", startAudioOnInteraction);
          } catch (error) {
            console.error("Still failed to play after interaction", error);
          }
        };
        document.addEventListener("click", startAudioOnInteraction);
        document.addEventListener("keydown", startAudioOnInteraction);
      }
    };

 
    if (audio.readyState >= 3) {
      tryPlay();
    } else {
      audio.addEventListener('canplaythrough', tryPlay, false);
    }


    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', tryPlay, false);
    };
  }, [volumeValue]);


  const handleAudioVolumeChange = (value) => {
    setVolumeValue(value);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value / 100;
    }
  };


  const toGame = async () => {
    setIsTransitioning(true);
    const audio = audioRef.current;
    if (audio) audio.pause();
    await new Promise((resolve) => setTimeout(resolve, 300));
    navigate("/MainGame");
  };


  const toFate = async () => {
    setIsTransitioning(true);
    const audio = audioRef.current;
    if (audio) audio.pause();
    await new Promise((resolve) => setTimeout(resolve, 10));
    navigate("/FindYourFate");
  };


  const closeWin = async () => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    await appWindow.close();
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleKeydown = (event) => {
    if (event.key === "Escape") setShowModal(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="main-container"
    >
      {!isTransitioning && (
        <div className="back-container">
          <video
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/video/mainmenu.mp4" type="video/mp4" />
          </video>
          <div className="content-overlay">
            <nav className="container">
              <button onClick={toGame}>Play PVP</button>
              <button onClick={toFate}>Find your FATE</button>
              <button onClick={toggleModal}>Settings</button>
              <button onClick={closeWin}>Exit</button>
            </nav>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <motion.div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <button className="close-button" onClick={toggleModal}>
              ×
            </button>
            <h2>Settings</h2>
            <label htmlFor="volume">Music Volume:</label>
            <input
              type="range"
              id="volume"
              min="0"
              max="100"
              value={volumeValue}
              onChange={(e) => handleAudioVolumeChange(e.target.value)}
            />
            <p>Current volume: {volumeValue}%</p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}