import React from 'react';

const Rank=({name,entries})=>{
    return(
        <div className='f2' >
            <div>
                {`${name}, your current entry count is...`}
            </div>
            <div className='f1'>
                {entries}
            </div>
        </div>
    );
}

export default Rank; 