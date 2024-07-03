import React from 'react';

const ProductivityTechnique = ({ title, description, buttonText, onClick }) => {
    return (
        <div className="productivity-technique">
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={onClick}>{buttonText}</button>
        </div>
    );
};

export default ProductivityTechnique;
