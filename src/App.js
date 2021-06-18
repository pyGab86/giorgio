
import './App.css';
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import TapMusic from './Components/TapMusic';

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


function App() {

  var [headerContent, setHeaderContent] = useState();

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
        <MusicBox>          
          <TapMusic></TapMusic>
        </MusicBox>
      </MainWrapper>
    )

    
  }

  
  return (
    <div className="App">
      <header className="App-header">
        {headerContent}
      </header>
      <main>
        {mainContent}
      </main>
    </div>
  );
}

export default App;
