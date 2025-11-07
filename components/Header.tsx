
import React from 'react';
import { MenuIcon } from './icons/Icons';

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    return (
        <header className="flex items-center justify-between p-4 bg-white border-b md:hidden">
            <h1 className="text-xl font-bold text-gray-800">এডমিন প্যানেল</h1>
            <button onClick={onToggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700">
                <MenuIcon />
            </button>
        </header>
    );
};

export default Header;
