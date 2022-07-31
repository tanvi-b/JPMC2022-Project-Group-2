import React from 'react';
import { stack as Menu } from 'react-burger-menu';

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Home
            </a>

            <a className="menu-item" href="/KeyspaceInfo">
                Keyspace Information
            </a>

            <a className="menu-item" href="/TableInfo">
                Tables
            </a>
        </Menu>
    );
};