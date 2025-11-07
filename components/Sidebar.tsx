import React from 'react';
import { HomeIcon, SettingsIcon, UsersIcon, BellIcon, TrophyIcon, CalendarIcon, BookOpenIcon, ImageIcon, PhoneIcon, CloseIcon } from './icons/Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onNavigate: (pageId: string) => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  { id: 'dashboard', name: 'ড্যাশবোর্ড', icon: HomeIcon },
  { id: 'site-info', name: 'সাইটের তথ্য', icon: SettingsIcon },
  { id: 'teachers', name: 'শিক্ষক', icon: UsersIcon },
  { id: 'notices', name: 'নোটিস', icon: BellIcon },
  { id: 'results', name: 'ফলাফল', icon: TrophyIcon },
  { id: 'routines', name: 'রুটিন', icon: CalendarIcon },
  { id: 'digital-content', name: 'ডিজিটাল কনটেন্ট', icon: BookOpenIcon },
  { id: 'gallery', name: 'গ্যালারি', icon: ImageIcon },
  { id: 'contact', name: 'যোগাযোগ', icon: PhoneIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activePage, onNavigate }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white flex flex-col z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Main"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold">এডমিন প্যানেল</h1>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white" aria-label="Close sidebar">
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center w-full p-2 rounded-md transition-colors duration-200 text-left ${
                  item.id === activePage
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{item.name}</span>
              </button>
            ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-700">
           <p className="text-xs text-slate-400 text-center">ডেমো সংস্করণ</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
