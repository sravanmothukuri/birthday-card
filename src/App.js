import React, { useState, useEffect } from "react";
import FloatingSymbols from "./components/FloatingSymbols";
import RectangleText from "./components/RectangleText";
import PhotoCarousel from "./components/PhotoCarousel";
import RadhakrishnaImage from "./assets/Radhakrishna.jpg";
import music from "./assets/music.mp3";
import flyingImage from "./assets/image.png";
import balloonImage from "./assets/balloon.png";
import birthdayVideo from "./assets/birthday.mp4";
import cakeImage from "./assets/Cake.jpeg";
import "./App.css";

function App() {
  const [step, setStep] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [showNewPage, setShowNewPage] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [balloonVisible, setBalloonVisible] = useState(false);
  const [cakeVisible, setCakeVisible] = useState(false);
  const [messageTransition, setMessageTransition] = useState("fade-in");
  const [showSpecialMessageButton, setShowSpecialMessageButton] = useState(false);
  const [hideMessageAndButton, setHideMessageAndButton] = useState(false);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const [showPhotosPage, setShowPhotosPage] = useState(false);

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
      setMessageTransition("fade-out");
      setTimeout(() => {
        setStep((prev) => Math.min(prev + 1, messages.length - 1));
        setMessageTransition("fade-in");
      }, 1000);
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

  const handleCakeCutClick = () => {
    setCakeVisible(true);
  };

  const handleCakeImageRightClick = (e) => {
    e.preventDefault();
    setHideMessageAndButton(true);
    setShowSpecialMessageButton(true);
  };

  const handleSpecialMessageClick = () => {
    setShowSpecialMessage(true);
  };

  const handlePhotosClick = () => {
    setShowPhotosPage(true);
    setShowSpecialMessage(false);
  };

  const resetToInitialState = () => {
    setShowSpecialMessage(false);
    setStep(0);
    setIsEnd(false);
    setShowNewPage(false);
    setMusicPlaying(false);
    setImageVisible(false);
    setBalloonVisible(false);
    setCakeVisible(false);
    setHideMessageAndButton(false);
    setShowSpecialMessageButton(false);
    setShowPhotosPage(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [step, isEnd, showNewPage, musicPlaying, imageVisible]);

  // PhotoCarousel Render
  if (showPhotosPage) {
    return <PhotoCarousel onReset={resetToInitialState} />;
  }

  // Special Message Render
  if (showSpecialMessage) {
    return (
      <div className="App" style={{ backgroundColor: "#f8e2e7", height: "100vh" }}>
        <FloatingSymbols />
        <RectangleText messages={["Happy Birthday Nanna"]} transition={messageTransition} />
        <div
          style={{
            position: "absolute",
            top: "5%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <button
            onClick={handlePhotosClick}
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
            Photos Choodhama Babyy
          </button>
        </div>
      </div>
    );
  }

  // Birthday Video Render
  if (isEnd && !showNewPage) {
    return (
      <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
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

  // New Page with Decorations Render
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

        {balloonVisible && (
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <button
              onClick={handleCakeCutClick}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "1.2rem",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Cake Cut Cheddama?
            </button>
          </div>
        )}

        {cakeVisible && !hideMessageAndButton && (
          <>
            <img
              src={cakeImage}
              alt="Cake"
              style={{
                position: "absolute",
                bottom: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "300px",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
              onContextMenu={handleCakeImageRightClick}
            />
            <div
              style={{
                position: "absolute",
                bottom: "5%",
                right: "5%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                borderRadius: "15px",
                padding: "10px 20px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Cake ni Cursor tho Cut chey Bangaram
            </div>
          </>
        )}

        {showSpecialMessageButton && (
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <button
              onClick={handleSpecialMessageClick}
              style={{
                backgroundColor: "purple",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "1.2rem",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Open to See the Special Message
            </button>
          </div>
        )}
      </div>
    );
  }

  // Initial Render
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
      <RectangleText messages={messages} transition={messageTransition} />
    </div>
  );
}

export default App;