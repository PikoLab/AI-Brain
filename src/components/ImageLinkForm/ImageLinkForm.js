import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm=({onInputChange,onButtonSubmit})=>{
    return(
        <div>
            <p className='f4'>{'This AI Brain will detect faces in your pictures. Give it a try!'}</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}></input>
                    <button className='f4 w-30 grow link ph3 pv2 dib white bg-gray' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
            

        </div>
    );
}

export default ImageLinkForm; 