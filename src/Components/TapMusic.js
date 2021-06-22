import Store from '../Store';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import useSound from 'use-sound';
import kik from '../assets/DevastKick.wav';
import kik1 from '../assets/GO_TO_808_E.wav';
import beep from '../assets/beep.mp3';
import clap from '../assets/clap.mp3';
import female_voice from '../assets/female_voice.mp3';
import mono from '../assets/mono.mp3';
import mono1 from '../assets/mono1.mp3';
import mono2 from '../assets/mono2.mp3';
import mono3 from '../assets/mono3.mp3';
import shake from '../assets/shake.mp3';
import snare from '../assets/snare.mp3';
import rattle from '../assets/rattle.mp3';


const ButtonsGrid = styled.div`
    display: grid;
    grid: repeat(4, 25%) / repeat(3, 33.33%);
    width: 98%;
    max-width: 500px;
    height: 98%;
    justify-self: center;

`

const MusicButton = styled.div`
    background-color: rgba(33, 33, 33, 0.3);
    margin: 3px;
    border-radius: 3px;

    &:active {
        background-color: rgb(33, 33, 33, 0.6);
    }

    &:hover {
        cursor: pointer;
    }

`

const RecorderWrapper = styled.div`
    position: absolute;
    top: 0px;
    margin-top: 50px;
    margin-inline: 10px;
    font-size: 16px;
    color: white;
    font-weight: bold;
    border: 2px white solid;
    border-radius: 5px;
    width: 90%;
    max-width: 800px;
    text-align: center;

    &:hover, &:active {
        background-color: rgba(255, 255, 255, 0.4);
        cursor: pointer;
    }
` 

const GridWrapper = styled.div`
    border-radius: 10px;
    background-color: rgba(200, 200, 200, 0.15);
    backdrop-filter: blur(5px);
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    max-height: 300px;
    max-width: 800px;
    position: absolute;
    bottom: 10px;
    width: 90%;
`



function TapMusic() {

    const [playKick] = useSound(kik);
    const [playKick1] = useSound(kik1);
    const [playBeep] = useSound(beep);
    const [playClap] = useSound(clap);
    const [playFemaleVoice] = useSound(female_voice);
    const [playMono] = useSound(mono);
    const [playMono1] = useSound(mono1);
    const [playMono2] = useSound(mono2);
    const [playSnare] = useSound(snare);
    const [playShake] = useSound(shake);
    const [playMono3] = useSound(mono3);
    const [playRattle] = useSound(rattle);

    const [song, setSong] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState('Press R to start recording');

    const keys = ['ArrowRight', '0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    const noteDispatcher = (note, time) => {
        var currentRecordingBool = Store.getState().recording[Store.getState().recording.length - 1].recording;
        if (currentRecordingBool) {
            setSong([...song, {note, time, id: Math.random()}]);
        }
    }

    const manageRecord = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setText('Recording... Press S to stop');
        } else {
            setText('Press R to start recording');
        }
    }

    // Play songs when clicking on buttons
    const buttonClicked = (id) => {
        var currentRecordingBool = Store.getState().recording[Store.getState().recording.length - 1].recording;

        if (keys.includes(id)) {
            document.getElementById(id).style.backgroundColor = 'rgb(33, 33, 33, 0.6)';
            setTimeout(() => {
                document.getElementById(id).style.backgroundColor = "rgba(33, 33, 33, 0.3)";
            }, 150);
        }

        switch (id) {
            case 'ArrowRight':
                playClap();
                noteDispatcher('ArrowRight', Date.now());
                break;
            case '0':
                playKick1();
                noteDispatcher('0', Date.now());
                break;
            case '.':
                playKick();
                noteDispatcher('.', Date.now());
                break;            
            case '1':
                playFemaleVoice();
                noteDispatcher('1', Date.now());
                break;
            case '2':
                playBeep();
                noteDispatcher('2', Date.now());
                break;
            case '3':
                playSnare();
                noteDispatcher('3', Date.now());
                break;
            case '4':
                playMono();
                noteDispatcher('4', Date.now());
                break;
            case '5':
                playMono1();
                noteDispatcher('5', Date.now());
                break;
            case '6':
                playMono2();
                noteDispatcher('6', Date.now());
                break;
            case '7':
                playMono3();
                noteDispatcher('7', Date.now());
                break;
            case '8':
                playShake();
                noteDispatcher('8', Date.now());
                break;
            case '9':
                playRattle();
                noteDispatcher('9', Date.now());
                break;

            case 'rec':
                if (!currentRecordingBool) {
                    console.log('Recordiiiing');
                    setSong([...song, {note: 'start', time: Date.now()}])
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: true}
                    });
                    manageRecord();
                } else {
                    console.log('Stop. Song:', song);
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: false}
                    });

                    // Save our song to the store and delete local state song
                    Store.dispatch({
                        type: 'ADD_SONG',
                        payload: {songs: song}
                    });

                    setSong([]);
                    manageRecord();
                }

                break;
              
            default:
                console.log('unknown pad');
                break;
        }
    }

    // Play songs with keyboard
    document.onkeydown = function(e) {
        e = e || window.event;
        // Change the pad's color for a few milliseconds
        if (keys.includes(e.key)) {

            document.getElementById(e.key).style.backgroundColor = 'rgb(33, 33, 33, 0.6)';
            setTimeout(() => {
                document.getElementById(e.key).style.backgroundColor = "rgba(33, 33, 33, 0.3)";
            }, 150);

        }

        var currentRecordingBool = Store.getState().recording[Store.getState().recording.length - 1].recording;
        
        switch (e.key) {
            case 'ArrowRight':
                playClap();
                noteDispatcher('ArrowRight', Date.now());
                break;
            case '0':
                playKick1();
                noteDispatcher('0', Date.now());
                break;
            case '.':
                playKick();
                noteDispatcher('.', Date.now());
                break;            
            case '1':
                playFemaleVoice();
                noteDispatcher('1', Date.now());
                break;
            case '2':
                playBeep();
                noteDispatcher('2', Date.now());
                break;
            case '3':
                playSnare();
                noteDispatcher('3', Date.now());
                break;
            case '4':
                playMono();
                noteDispatcher('4', Date.now());
                break;
            case '5':
                playMono1();
                noteDispatcher('5', Date.now());
                break;
            case '6':
                playMono2();
                noteDispatcher('6', Date.now());
                break;
            case '7':
                playMono3();
                noteDispatcher('7', Date.now());
                break;
            case '8':
                playShake();
                noteDispatcher('8', Date.now());
                break;
            case '9':
                playRattle();
                noteDispatcher('9', Date.now());
                break;

            // Check for r or s to be pressed
            case 'r':                
            case 'R':

                if (!currentRecordingBool) {
                    console.log('Recordiiiing');
                    setSong([...song, {note: 'start', time: Date.now()}])
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: true}
                    });

                    manageRecord();
                }

                break;

            case 's':
            case 'S':

                if (currentRecordingBool) {
                    console.log('Stop. Song:', song);
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: false}
                    });

                    // Save our song to the store and delete local state song
                    Store.dispatch({
                        type: 'ADD_SONG',
                        payload: {songs: song}
                    });

                    setSong([]);
                    manageRecord();

                }

                break;
              
            default:
                console.log('unknown pad');
                break;
        }
    }


    return (
        <>
            <RecorderWrapper id="rec" onClick={() => {buttonClicked('rec')}}>
                <h4>{text}</h4>
            </RecorderWrapper>

            <GridWrapper>
                <ButtonsGrid>
                    <MusicButton id="7" onClick={() => {buttonClicked('7')}}></MusicButton>
                    <MusicButton id="8" onClick={() => {buttonClicked('8')}}></MusicButton>
                    <MusicButton id="9" onClick={() => {buttonClicked('9')}}></MusicButton>
                    <MusicButton id="4" onClick={() => {buttonClicked('4')}}></MusicButton>
                    <MusicButton id="5" onClick={() => {buttonClicked('5')}}></MusicButton>
                    <MusicButton id="6" onClick={() => {buttonClicked('6')}}></MusicButton>
                    <MusicButton id="1" onClick={() => {buttonClicked('1')}}></MusicButton>
                    <MusicButton id="2" onClick={() => {buttonClicked('2')}}></MusicButton>
                    <MusicButton id="3" onClick={() => {buttonClicked('3')}}></MusicButton>
                    <MusicButton id="ArrowRight" onClick={() => {buttonClicked('ArrowRight')}}></MusicButton>
                    <MusicButton id="0" onClick={() => {buttonClicked('0')}}></MusicButton>
                    <MusicButton id="." onClick={() => {buttonClicked('.')}}></MusicButton>
                </ButtonsGrid>
            </GridWrapper>
        </>
    )
}

export default TapMusic;