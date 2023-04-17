import React from 'react'
import MainField from './mainField'
import SelectField from './selectField';

const RecordingSection = ({ formObj }: { formObj: any }) => {
    const checked = false;
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
                    <label className="btn" style={{ opacity: "0.8" }}>
                        <input type="radio" autoComplete='off' className="btn" checked={!checked} />
                        Play
                    </label>
                    <label className="btn">
                        <input type="radio" autoComplete='off' className="btn" checked={checked} />
                        Say
                    </label>
                </div>
            </div>
            {
                checked ? (<MainField formObj={formObj} name="File" inputType="file" />) :
                    (
                        <div className="small-fields">
                            <SelectField formObj={formObj} name="Voice" options={["Woman", "Man"]} />
                            <SelectField formObj={formObj} name="Language" options={languages} />
                        </div>
                    )
            }
            <MainField formObj={formObj} name="Text" inputType="textarea" />
        </div>
    )
}

export default RecordingSection