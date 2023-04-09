import React, { useEffect, useState } from 'react'
import MainField from './mainField';
import SmallFields from './smallFields';
import Toggle from './toggleComponent';

interface formTypesObj {
    [key: string]: any
}

const FormContent = ({formId}: {formId: number}) => {
    const [att, setAtt] = useState('');
    let elements: any[];
    const [checked, setChecked] = useState(false);

    const formType: formTypesObj = {
        'dial': {
            'Node name': 'text',
            split: {
                'recording setting': ['off', 'on Answer', 'entire call'],
                'dial attempts': 'number',
                'timeout': 'number',
                'max call length': 'number',
                'max recording time': 'number',
                'call id': 'phone'
            },
            toggle: 'whisper',
            'routing plan': 'url'
        },
        'hangup': {
            'Node name': 'text',
            toggle: 'Message'
        },
        'menu': {
            'Node name': 'text',
            split: {
                'timout (sec)': 'number',
                'retries': 'number',
                'plays': 'number',
                'button': 'button'
            },
            'file': 'select',
            'menu tag name': 'text'
        },
        'router': {
            'node name': 'text',
            'routes': 'routes'
        },
        'gather': {
            'node name': 'text',
            'file': 'select',
            split: {
                'plays': 'number',
                'button': 'button',
                'gather tag name': 'text',
                'number of digits': 'number',
                'min number of digits': 'number',
                'valid digits': 'text',
                'finish on key': 'text',
                'timeout': 'number',
                'key press time out (sec)': 'number',
                'retries': 'number'
            }
        },
        'go to': {
            'node name': 'text',
            'count': 'number',
            // Add button
        },
        'hours': {
            'node name': 'text',
            'time zone': 'select',
            split: {
                'setting type': 'button'
            }
            // update this later
        },
        'pixel': {
            'node name': 'text',
            'URL': 'url',
            split: {
                'max fires': 'number'
            },
            toggle: 'advanced'
            // Update later
        },
        'play': {
            'node name': 'text',
            split: {
                'plays': 'number',
                'button': 'button'
            },
            'file': 'select'
        },
        'voicemail': {
            'node name': 'text',
            split: {
                'finish on key': 'text'
            },
            toggle: 'play beep'
        }
    };

    useEffect(() => {
        elements = [...document.querySelectorAll('.node > div')];
        const elementName = elements[formId].getAttribute('data-default-node-name').toLowerCase();
        setAtt(elementName);
    }, [formId]);

    

  if(att.length > 0) {
    return (
        <div className="form-content">
            {
                formType[att] && 
                Object.keys(formType[att]).map((key) => {
                    // console.log(key)
                    switch(key) {
                        case 'split':
                            return (<SmallFields key={key} obj={formType[att][key]} />);
                        case 'toggle':
                            return (<Toggle 
                                key={key}
                                checked={checked}
                                onChange={setChecked}
                                name={formType[att][key]} 
                            />)
                        default:
                            return (<MainField key={key} formType={formType[att][key]} name={key} />)
                    }
                }) 
            }
        </div>
      )
  } else {
    return <></>
  }
}

export default FormContent