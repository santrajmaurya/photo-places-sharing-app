import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

interface ButtonProps {
    href?: string,
    size?: number,
    inverse?: boolean,
    danger?: boolean,
    children?: string[] | string,
    to?: string,
    exact?: boolean,
    type?: any,
    onClick?: () =>  void,
    disabled?: boolean
}



const Button: React.FC<ButtonProps> = ({ href, size, inverse, danger, children, to, exact, type, onClick, disabled  }) => {
    if (href) {
        return (
            <a
                className={`button button--${size || 'default'} ${inverse &&
                    'button--inverse'} ${danger && 'button--danger'}`}
                href={href}
            >
                {children}
            </a>
        );
    }
    if (to) {
        return (
            <Link
                to={to}
                className={`button button--${size || 'default'} ${inverse &&
                    'button--inverse'} ${danger && 'button--danger'}`}
            >
                {children}
            </Link>
        );
    }
    return (
        <button
            className={`button button--${size || 'default'} ${inverse &&
                'button--inverse'} ${danger && 'button--danger'}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
