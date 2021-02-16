// CatInputs.js

import React from 'react';
import PropTypes from 'prop-types';
import './challenge.css';

const CatInputs = ({ idx, catState, handleCatChange }) => {
    const catId = `Question-${idx}`;
    const OptionId = `Option1-${idx}`;
    const OptionId2 = `Option2-${idx}`;
    const OptionId3 = `Option3-${idx}`;
    const OptionId4 = `Option4-${idx}`;
    return (
        <div key={`cat-${idx}`}>
            <label htmlFor={catId}>{`Question #${idx + 1}`}</label>
            <input
                type="text"
                name={catId}
                data-idx={idx}
                id={catId}
                className="name"
                value={catState[idx].name}
                onChange={handleCatChange}
            />
            <label htmlFor={OptionId}>Options</label>
            <input
                type="text"
                name={OptionId}
                data-idx={idx}
                id={OptionId}
                className="age"
                value={catState[idx].age}
                onChange={handleCatChange}
            />
        </div>
    );
};

CatInputs.propTypes = {
    idx: PropTypes.number,
    catState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default CatInputs;


