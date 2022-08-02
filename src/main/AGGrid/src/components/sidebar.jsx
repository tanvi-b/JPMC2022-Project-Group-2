import React from 'react';
import { stack as Menu } from 'react-burger-menu';

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Home
            </a>
            <a className="menu-item" href="/keyspaces">
                Keyspaces
            </a>
            <a className="menu-item" href="/tables">
                Tables
            </a>
            <a className="menu-item" href="/system">
                system
            </a>
            <a className="menu-item" href="/system_auth">
                system_auth
            </a>
            <a className="menu-item" href="/system_schema">
                system_schema
            </a>
            <a className="menu-item" href="/system_distributed">
                system_distributed
            </a>
            <a className="menu-item" href="/system_traces">
                system_traces
            </a>
            <a className="menu-item" href="/testkeyspace">
                testkeyspace
            </a>
            <a className="menu-item" href="/mykey">
                mykey
            </a>

        </Menu>
    );
};