import React, { useState, useEffect } from 'react'
import MainField from './mainField'
import SelectField from './selectField';

const RecordingSection = ({ formObj }: { formObj: any }) => {
    // const [selectedValue, setSelectedValue] = useState('play');
    const nodeId = formObj?.formIsOpen;
    let selectedValue = formObj?.forms[nodeId]['mediaType'] || 'play'

    const handleChange = (event: any) => {
        // setSelectedValue(event.target.value);
        formObj?.updateForm((prev: any) => {
            return { ...prev, [nodeId]: { ...prev[nodeId], 'mediaType': (event.target as HTMLInputElement).value } }
        });
    };

    const languages = [
        "Dutch",
        "English (AU)",
        "English (GB)",
        "English (US)",
        "Hindi",
        "Punjabi"
    ]
    return (
        <div className="recording-section">
            <div className="small-fields">
                <MainField formObj={formObj} name="Plays" inputType="number" />
                <div className="btn-group">
                    <label
                        className="btn"
                        style={{ opacity: selectedValue === 'play' ? "1" : "0.6" }}
                    >
                        <input
                            type="radio"
                            name="media-type"
                            value="play"
                            checked={selectedValue === 'play'}
                            onChange={handleChange}
                        />
                        Play
                    </label>
                    <label
                        className="btn"
                        style={{ opacity: selectedValue === 'say' ? "1" : "0.6" }}
                    >
                        <input
                            type="radio"
                            name="media-type"
                            value="say"
                            checked={selectedValue === 'say'}
                            onChange={handleChange}
                        />
                        Say
                    </label>
                </div>
            </div>
            {
                selectedValue == 'play' ?
                    (<MainField formObj={formObj} name="File" inputType="file" />)
                    :
                    (<>
                        <div className="small-fields">
                            <SelectField formObj={formObj} name="Voice" options={["Woman", "Man"]} />
                            <SelectField formObj={formObj} name="Language" options={languages} />
                        </div>
                        <MainField formObj={formObj} name="Text" inputType="textarea" />
                    </>)
            }
        </div>
    )
}

export default RecordingSection