import styled from 'styled-components';
import {useState} from 'react';


const SettingsWrapper = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    
`
const SettingsButton = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background: yellow;
    z-index: 1;
`
const SettingsOpenedBox = styled.div`
    position: absolute;
    width: 200px;
    height: 50px;
    background: yellow;
    z-index: 1;
`

const Settings = () => {

    const [settingsOpened, setsettingsOpened] = useState(false);
    const [content, setContent] = useState(<SettingsButton></SettingsButton>);
    const [recording, setRecording] = useState(false);
    
    const settingsButtonClick = () => {
        if (settingsOpened) {
            return <SettingsButton id="SettingsButton"></SettingsButton>
        } else {
            return (
                <SettingsOpenedBox id="OpenedBoxSettings">
                    <button id='recorder' name='recorder' onClick={() => {
                        console.log('record');
                    }}>Record</button>
                </SettingsOpenedBox>
            )
        }
    }
    
    return (
        <SettingsWrapper id="Settings" onClick={() => {
            setsettingsOpened(!settingsOpened); setContent(settingsButtonClick())}}>
            {content}
        </SettingsWrapper>
    )
}

export default Settings;