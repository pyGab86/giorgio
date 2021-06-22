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
  max-height: 100%;
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
  width: 100%;
  height: 100%;
  justify-content: center;
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
  background: #de6161;  /* fallback for old browsers */
  background: -webkit-linear-gradient(-90deg, #2657eb, #de6161);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(-90deg, #2657eb, #de6161); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background-size: 300% 300%;
` 

const TutoWrapper = styled.div`
  position: fixed;
  bottom: 50px;
  background: linear-gradient(180deg, rgba(244,241,49,1) 0%, rgba(242,100,57,1) 42%, rgba(57,153,238,1) 83%);
  width: 90%;
  box-shadow: 5px 2px 10px rgb(0,0,0);
  max-width: 600px;
  border-radius: 5px;
`

const Tuto = styled.div`
  margin-left: 2px;
  width: 100%;
  height: 100%;
  background-color: rgb(22, 22, 22);
  border-radius: 0px 5px 5px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TutoText = styled.p`
  color: rgb(150, 150, 150);
  font-size: 14px;
  margin-top: 0px;
  text-align: center;
  margin-inline: 10px;
  margin-top: 10px;
`

function App() {

  var [mainContent, setMainContent] = useState(
    <MainWrapper>
      <TitleWrapper>
        <TitleInit>Giorgio</TitleInit>
        <Slogan>A Colorful Drum Pad</Slogan>
        <StartButton id="start" onClick={() => {startApp()}}>START</StartButton>
      </TitleWrapper>
      <TutoWrapper>
        <Tuto>
          <TutoText id="tuto-text">1 - Press R or click the record button<br/>2 - Use your numeric keyboard or click/tap on the pads<br/>3 - Press S or click the record button<br/>4 - Press the play or loop button to listen to your creation</TutoText>
        </Tuto>
      </TutoWrapper>
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
                <Slogan>A Colorful Drum Pad</Slogan>
                <StartButton id="start" onClick={() => {startApp()}}>START</StartButton>
              </TitleWrapper>
              <TutoWrapper>
                <Tuto>
                  <TutoText id="tuto-text">1 - Press R or click the record button<br/>2 - Use your numeric keyboard or click/tap on the pads<br/>3 - Press S or click the record button<br/>4 - Press the play or loop button to listen to your creation</TutoText>
                </Tuto>
              </TutoWrapper>
            </MainWrapper>)}}>
            <p>&#127968;</p>
          </Home>

        </Background>
          
        <MusicBox id="box">          
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
