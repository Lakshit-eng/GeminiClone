import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/context";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  // Function to render response with bold formatting and line breaks
  


  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {/* Ternary operator to check if results should be shown */}
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Speller..</span></p>
              <p>How can I help you today?</p>
            </div>
            {/* Starting cards */}
            <div className="cards">
              <div className="card">
                <p>Brieflt ypur name is the best name i have ever heared</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Quotes are not to motivate you but they are to remind you of Yourself</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Name the most famous musician of this world</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>How to create a great routine to adopt the ideal lifestyle</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p className="para">{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html:resultData }}></p>
              )}
            </div>
          </div>
        )}
        
        {/* Cards end here */}

        {/* Main bottom */}
        <div className="main-bottom">
          <div className="search-box">
            <input 
              onChange={(e) => { setInput(e.target.value); }} 
              value={input} 
              type="text" 
              placeholder="Enter a prompt here" 
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={() => { onSent(); }} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
