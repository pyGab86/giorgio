import './App.css';
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import TapMusic from './Components/TapMusic';
import Recorder from './Components/Recorder';


// Styled components
const MainWrapper = styled.div`
  background: rgb(33,33,33);
  width: 100%;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const TitleInit = styled.h1`
  margin: 0px;
  color: white;
  font-size: 30px;
`

const Slogan = styled.p`
  color: rgb(120, 120, 120);
`

const StartButton = styled.button`
  color: white;
  border: 2px white solid;
  background: none;
  width: 75px;
  height: 28px;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    animation: start-text-animation 0.2s ease-in;
    cursor: pointer;
  }
`

const MusicBox = styled.div`
  display: flex;
  width: 95%;
  max-width: 700px;
  height: 40%;
  position: absolute;
  bottom: 15px;
  border-radius: 10px;
  background-color: rgba(200, 200, 200, 0.15);
  backdrop-filter: blur(5px);
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
  justify-content: center;
  align-items: center;
`

const Home = styled.div`
  position: fixed;
  z-index: 1;
  top: -10px;
  right: 10px;
  
  &:hover {
    cursor: pointer;
  }
`

const Background = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background: linear-gradient(90deg, rgba(45,250,221,1) 0%, rgba(29,185,253,1) 47%, rgba(201,69,252,1) 98%);
  background-size: 300% 300%;
` 


function App() {

  var [mainContent, setMainContent] = useState(
    <MainWrapper>
      <TitleWrapper>
        <TitleInit>Giorgio</TitleInit>
        <Slogan>A colorful Drum Pad</Slogan>
        <StartButton onClick={() => {startApp()}}>START</StartButton>
      </TitleWrapper>
    </MainWrapper>
  );

  // Clicking the start button starts the app
  const startApp = () => {
    
    // Update the state
    setMainContent(
      <MainWrapper>
        <Background id="Background">
          
          <Recorder></Recorder>
          <Home onClick={() => {setMainContent(
            <MainWrapper>
              <TitleWrapper>
                <TitleInit>Giorgio</TitleInit>
                <Slogan>A colorful Drum Pad</Slogan>
                <StartButton onClick={() => {startApp()}}>START</StartButton>
              </TitleWrapper>
            </MainWrapper>)}}>
            <p>&#127968;</p>
          </Home>

        </Background>
          
        <MusicBox>          
          <TapMusic></TapMusic>
        </MusicBox>
      </MainWrapper>
    )
  }

  
  return (
    <div className="App">
      <main>
        {mainContent}
      </main>
    </div>
  );
}

export default App;
