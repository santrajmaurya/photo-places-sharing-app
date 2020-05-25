import React from 'react';

import './Avatar.scss';

interface AvatarProps {
    image: string,
    alt: string,
    className?: any,
    style?: any,
    width?: any
}

const Avatar: React.FC<AvatarProps> = ({ image, alt, className, style, width }) => {
    return (
        <div className={`avatar ${className}`} style={style}>
            <img
                src={image}
                alt={alt}
                style={{ width: width, height: width }}
            />
        </div>
    );
};

export default Avatar;
