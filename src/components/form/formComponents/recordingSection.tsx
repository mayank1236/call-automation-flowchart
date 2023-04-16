import React from 'react'
import MainField from './mainField'

const RecordingSection = ({ formObj }: { formObj: any }) => {
    return (
        <div className="recording-section">
            <MainField formObj={formObj} name="Plays" inputType="number" />
            <div className="btn-group">
                <label className="btn">
                    <input type="radio" autoComplete='off' checked={true} />
                    Play
                </label>
                <label className="btn">
                    <input type="radio" autoComplete='off' checked={false} />
                    Say
                </label>
            </div>
            <MainField formObj={formObj} name="File" inputType="file" />
        </div>
    )
}

export default RecordingSection