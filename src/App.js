import React, { useState, useEffect } from "react";
import FloatingSymbols from "./components/FloatingSymbols";
import RectangleText from "./components/RectangleText";
import RadhakrishnaImage from "./assets/Radhakrishna.jpg";
import music from "./assets/music.mp3";
import flyingImage from "./assets/image.png";
import balloonImage from "./assets/balloon.png";
import birthdayVideo from "./assets/birthday.mp4";
import "./App.css";

function App() {
  const [step, setStep] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [showNewPage, setShowNewPage] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [balloonVisible, setBalloonVisible] = useState(false);
  const [messageTransition, setMessageTransition] = useState("fade-in"); // State to control transition effect

  const messages = [
    "It's Your Special Day Yeyey!!",
    "I Have Made Something For You Because You are Special For Me",
    "Do You Wanna See What I Made? Let's Go!!",
  ];

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      if (isEnd && !showNewPage) {
        handleLightsOn();
      } else if (showNewPage && !musicPlaying) {
        handlePlayMusic();
      } else if (musicPlaying && !imageVisible) {
        handleDecorateClick();
      } else {
        handleEnterKeyAction();
      }
    }
  };

  const handleEnterKeyAction = () => {
    if (step === 2) {
      setIsEnd(true);
    } else {
      // Trigger fade-out transition before updating the message
      setMessageTransition("fade-out");
      setTimeout(() => {
        setStep((prev) => Math.min(prev + 1, messages.length - 1));
        setMessageTransition("fade-in"); // Trigger fade-in after message update
      }, 1000); // Wait for the fade-out animation to complete before changing the message
    }
  };

  const handleLightsOn = () => {
    setShowNewPage(true);
  };

  const handlePlayMusic = () => {
    if (!musicPlaying) {
      setMusicPlaying(true);
      const audioObj = new Audio(music);
      audioObj.loop = true;
      audioObj.play();
    }
  };

  const handleDecorateClick = () => {
    setImageVisible(true);
  };

  const handleFlyBalloons = () => {
    setBalloonVisible(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [step, isEnd, showNewPage, musicPlaying, imageVisible]);

  if (isEnd && !showNewPage) {
    return (
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
        }}
      >
        <video
          src={birthdayVideo}
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        ></video>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            textAlign: "center",
            fontFamily: "Lexend",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Many More Happy Returns of the Day Babyy!!! I have Planned more.
          <br />
          Click on "Lights On"
        </div>

        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <button
            onClick={handleLightsOn}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "10px 20px",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            Lights On
          </button>
        </div>
      </div>
    );
  }

  if (showNewPage) {
    return (
      <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
        <div
          style={{
            backgroundImage: `url(${RadhakrishnaImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.5,
            zIndex: -1,
          }}
        ></div>

        {!musicPlaying && (
          <div
            style={{
              position: "absolute",
              top: "5%",
              width: "100%",
              textAlign: "center",
            }}
          >
            <button
              onClick={handlePlayMusic}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "1.2rem",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Play Music
            </button>
          </div>
        )}

        {musicPlaying && !imageVisible && (
          <div
            style={{
              position: "absolute",
              top: "5%",
              width: "100%",
              textAlign: "center",
            }}
          >
            <button
              onClick={handleDecorateClick}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "1.2rem",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Decorate
            </button>
          </div>
        )}

        {imageVisible && (
          <>
            <img
              src={flyingImage}
              alt="Flying Decoration"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
              }}
            />
            {!balloonVisible && (
              <div
                style={{
                  position: "absolute",
                  top: "5%",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={handleFlyBalloons}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Fly Balloons
                </button>
              </div>
            )}
          </>
        )}

        {balloonVisible && (
          <div className="balloon-container">
            {Array.from({ length: 15 }).map((_, index) => (
              <img
                key={index}
                src={balloonImage}
                alt="Balloon"
                className="balloon"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#f8e2e7",
        height: "100vh",
        transition: "background-color 0.5s ease",
      }}
    >
      <FloatingSymbols />
      <RectangleText
        messages={messages}
        transition={messageTransition} // Pass transition state to RectangleText
      />
    </div>
  );
}

export default App;
