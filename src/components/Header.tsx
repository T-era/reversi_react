import React from 'react';

import logo from './img/Logo.svg';
import './Header.scss';

export const title = 'ひっくりかえし';

export default function Header() {
    return (
        <h1>
            <img src={logo} alt={title} />{title}
        </h1>
    )
}