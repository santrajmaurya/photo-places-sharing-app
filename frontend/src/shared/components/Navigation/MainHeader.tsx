import React from 'react';

import './MainHeader.scss';

interface MainHeaderProps {
    children: any
}


const MainHeader: React.FC<MainHeaderProps> = ({ children }) => {

    return <header className='main-header'>{children}</header>;
}

export default MainHeader;


