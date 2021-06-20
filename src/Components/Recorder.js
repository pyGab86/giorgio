import styled from 'styled-components';
import {useState, useEffect} from 'react';
import Store from '../Store';

const RecorderWrapper = styled.div`
    margin-top: 50px;
    margin-inline: 10px;
    font-size: 16px;
    color: white;
    font-weight: bold;
    border: 2px white solid;
    border-radius: 5px;
    padding-left: 10px;

    &:hover, &:active {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.4);
    }
` 

const SongsWrapper = styled.div`
    margin-top: 30px;
    margin-inline: 10px;
    display: flex;
`

const SongBox = styled.div`
    width: 66px;
    height: 30px;
    background-color: white;
    border-radius: 15px;
    margin: 5px;
`


const Recorder = () => {

    const [isRecording, setIsRecording] = useState(false);
    const [isRecordingStore, setIsRecordingStore] = useState(false);
    const [text, setText] = useState('Press R to start recording');
    const [song, setSong] = useState([]);
    const [songs, setSongs] = useState([]);
    const [songBoxes, setSongBoxes] = useState([]);

    Store.subscribe(() => {
        setIsRecordingStore(Store.getState().recording[Store.getState().recording.length - 1].recording);
        setSong(Store.getState().songs[Store.getState().songs.length - 1].songs);
        setSongs([...songs, Store.getState().songs[Store.getState().songs.length - 1].songs]);
    });

    const manageRecord = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setText('Recording... Press S to stop');
        } else {
            setText('Press R to start recording');
        }     
    }

    const clickRecord = () => {

        Store.dispatch({
            type: 'REC',
            payload: {recording: !isRecordingStore}
        });

        manageRecord();
    }

    if (isRecording !== isRecordingStore) {
        manageRecord()
    }

    const playSong = (mySong) => {
        console.log('rggrgtrt', mySong);
    }

    

    useEffect(() => {
        // Create the new song element
        console.log(songs);
        if (songs.length > 0) {
            var index = 0;
            songs.map((mySong) => {
                if (mySong.length > 0) {
                    return (
                        <SongBox id={index} onClick={() => {playSong(mySong)}}>
                            Coucou
                        </SongBox>
                    )
                }
            })
        }

    }, [song, songs]);

    return <>
        <RecorderWrapper onClick={() => {clickRecord()}}>
            <h4>{text}</h4>
        </RecorderWrapper>
        <SongsWrapper>
            {songBoxes}
        </SongsWrapper>
        
    </>

}

export default Recorder;