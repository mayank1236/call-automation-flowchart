import React from 'react'

const SmallFields = ({ obj }: { obj: any}) => {
    return (
        <div className="field-container small-field-container">
            {
                Object.keys(obj).map(item => {
                    return (<div key={item} className="field-container small-field">
                        <label>{item}</label>
                        <div className="field">
                            {
                                (!Array.isArray(obj[item])) ?
                                    (<input type={obj[item]} />)
                                    :
                                    (<select>
                                        {obj[item].map((arr: string) => {
                                            return (<option key={arr} value={arr}>{arr}</option>)
                                        })}
                                    </select>)  
                            }
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

export default SmallFields