import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { 
  SiteInfoPage,
  TeacherManagementPage,
  ContentManagerPage,
  GalleryManagementPage,
  ContactManagementPage 
} from './components/Dashboard';


// --- Mock Data ---
// All data is now mock and managed by React state
const initialSiteInfo = {
  collegeName: 'শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয়',
  slogan: 'শিক্ষাই জাতির মেরুদণ্ড',
  heroImage: 'https://placehold.co/1200x400/31C48D/FFFFFF/png?text=College+Campus',
  about: 'সালে প্রতিষ্ঠিত শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয় বগুড়া জেলার একটি অন্যতম সেরা কারিগরি ও বাণিজ্যিক শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মানসম্মত শিক্ষা এবং বাস্তবমুখী প্রশিক্ষণের মাধ্যমে ভবিষ্যতের জন্য প্রস্তুত করি।',
  principalName: 'মোঃ মাহবুব আলম (মানিক)',
  principalDesignation: 'প্রতিষ্ঠাতা ও অধ্যক্ষ',
  principalMessage: 'আমাদের লক্ষ্য হলো প্রত্যেক শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধ সম্পন্ন এবং কর্মমুখী শিক্ষায় শিক্ষিত করে দেশের সুনাগরিক হিসেবে গড়ে তোলা। প্রযুক্তিনির্ভর এই যুগে কারিগরি শিক্ষার কোনো বিকল্প নেই।',
  principalImage: 'https://placehold.co/150x150/000000/FFFFFF/png?text=Principal',
  mission: 'শিক্ষার্থীদের যুগোপযোগী কারিগরি ও বাণিজ্যিক জ্ঞান প্রদান করে দক্ষ মানবসম্পদ হিসেবে গড়ে তোলা এবং তাদের মধ্যে সততা, নৈতিকতা ও দেশপ্রেম জাগ্রত করা।',
  vision: 'দেশের অন্যতম সেরা কারিগরি শিক্ষা প্রতিষ্ঠান হিসেবে পরিচিতি লাভ করা এবং এমন একটি প্রজন্ম তৈরি করা যারা ডিজিটাল বাংলাদেশ গঠনে সক্রিয় ভূমিকা পালন করবে।',
  eiin: '১৩২২২০',
  collegeCode: '২০০৩০',
  established: '২০০৩ ইং',
  founder: 'মোঃ মাহবুব আলম (মানিক)',
};

const initialTeachers = [
  { id: 1, name: 'মোঃ আব্দুল করিম', designation: 'প্রভাষক (বাংলা)', qualification: 'এম.এ (বাংলা)', photo: 'https://placehold.co/100x100/7F9CF5/FFFFFF/png?text=AK' },
  { id: 2, name: 'ফাতেমা আক্তার', designation: 'প্রভাষক (ইংরেজি)', qualification: 'এম.এ (ইংরেজি)', photo: 'https://placehold.co/100x100/FBBF24/FFFFFF/png?text=FA' },
  { id: 3, name: 'ড. রফিকুল ইসলাম', designation: 'সহকারী অধ্যাপক (পদার্থ)', qualification: 'পিএইচ.ডি', photo: 'https://placehold.co/100x100/34D399/FFFFFF/png?text=RI' },
  { id: 4, name: 'সাদিয়া জাহান', designation: 'প্রভাষক (হিসাববিজ্ঞান)', qualification: 'এম.বি.এ', photo: 'https://placehold.co/100x100/F472B6/FFFFFF/png?text=SJ' },
];

const initialNotices = [
  { id: 1, title: '২০২৪ সালের এসএসসি পরীক্ষার রুটিন', date: '2024-07-15', type: 'file', link: '#' },
  { id: 2, title: 'কলেজের বার্ষিক ক্রীড়া প্রতিযোগিতা', date: '2024-07-10', type: 'link', link: '#' }
];

const initialResults = [
    { id: 1, title: 'একাদশ শ্রেণির বার্ষিক পরীক্ষার ফলাফল', date: '2024-06-30', type: 'file', link: '#' },
];

const initialRoutines = [
    { id: 1, title: 'একাদশ শ্রেণির ক্লাস রুটিন (বিজ্ঞান)', date: '2024-07-01', type: 'file', link: '#' },
];

const initialDigitalContent = [
    { id: 1, title: 'পদার্থবিজ্ঞান প্রথম পত্র লেকচার শিট', date: '2024-07-05', type: 'file', link: '#' },
];

const initialGallery = [
  { id: 1, title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩', imageUrl: 'https://placehold.co/400x300/31C48D/FFFFFF/png?text=Sports+Day' },
  { id: 2, title: 'সাংস্কৃতিক অনুষ্ঠান', imageUrl: 'https://placehold.co/400x300/3B82F6/FFFFFF/png?text=Cultural+Event' },
  { id: 3, title: 'পুরস্কার বিতরণী', imageUrl: 'https://placehold.co/400x300/F9A825/FFFFFF/png?text=Prize+Giving' },
  { id: 4, title: 'বিজ্ঞান মেলা', imageUrl: 'https://placehold.co/400x300/8B5CF6/FFFFFF/png?text=Science+Fair' }
];

const initialContactInfo = {
    address: 'দাড়িদহ, শিবগঞ্জ, বগুড়া',
    phone: '+8801234567890 (অফিস)',
    email: 'info@sfbtc.edu.bd',
    officeHours: 'শনিবার - বৃহস্পতিবার, সকাল ৯:০০ টা - বিকাল ৪:০০ টা',
    mapLink: 'https://maps.app.goo.gl/tqJk3j4X8B9yZz4aA'
};
// --- End Mock Data ---


const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  
  // State for all managed data
  const [siteInfo, setSiteInfo] = useState(initialSiteInfo);
  const [teachers, setTeachers] = useState<any[]>(initialTeachers);
  const [notices, setNotices] = useState(initialNotices);
  const [results, setResults] = useState(initialResults);
  const [routines, setRoutines] = useState(initialRoutines);
  const [digitalContent, setDigitalContent] = useState(initialDigitalContent);
  const [gallery, setGallery] = useState(initialGallery);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prevState => !prevState);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);
  
  const handleNavigate = useCallback((pageId: string) => {
    setActivePage(pageId);
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [closeSidebar]);
  
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'site-info':
        return <SiteInfoPage data={siteInfo} setData={setSiteInfo} />;
      case 'teachers':
        return <TeacherManagementPage teachers={teachers} setTeachers={setTeachers} />;
      case 'notices':
        return <ContentManagerPage title="নোটিশ ব্যবস্থাপনা" data={notices} setData={setNotices} />;
       case 'results':
        return <ContentManagerPage title="ফলাফল ব্যবস্থাপনা" data={results} setData={setResults} />;
       case 'routines':
        return <ContentManagerPage title="রুটিন ব্যবস্থাপনা" data={routines} setData={setRoutines} />;
       case 'digital-content':
        return <ContentManagerPage title="ডিজিটাল কনটেন্ট" data={digitalContent} setData={setDigitalContent} />;
      case 'gallery':
        return <GalleryManagementPage data={gallery} setData={setGallery} />;
      case 'contact':
        return <ContactManagementPage data={contactInfo} setData={setContactInfo} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
        activePage={activePage}
        onNavigate={handleNavigate}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
