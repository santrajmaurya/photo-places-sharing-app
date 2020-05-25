import React from 'react';

import './Card.scss';

interface CardProps {
    className?: any,
    style?: any,
    children: any
}

const Card: React.FC<CardProps> = ({ className, style, children }) => {
    return (
        <div className={`card ${className}`} style={style}>
            {children}
        </div>
    );
};

export default Card;
