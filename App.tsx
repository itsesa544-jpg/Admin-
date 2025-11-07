import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import { 
  SiteInfoPage,
  TeacherManagementPage,
  ContentManagerPage,
  GalleryManagementPage,
  ContactManagementPage 
} from './components/Dashboard';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, User } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// --- Mock Data ---
// In a real application, this would come from an API
const initialSiteInfo = {
  collegeName: 'শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয়',
  slogan: 'শিক্ষাই জাতির মেরুদণ্ড',
  heroImage: 'https://via.placeholder.com/1200x400',
  about: 'সালে প্রতিষ্ঠিত শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয় বগুড়া জেলার একটি অন্যতম সেরা কারিগরি ও বাণিজ্যিক শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মানসম্মত শিক্ষা এবং বাস্তবমুখী প্রশিক্ষণের মাধ্যমে ভবিষ্যতের জন্য প্রস্তুত করি।',
  principalName: 'মোঃ মাহবুব আলম (মানিক)',
  principalDesignation: 'প্রতিষ্ঠাতা ও অধ্যক্ষ',
  principalMessage: 'আমাদের লক্ষ্য হলো প্রত্যেক শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধ সম্পন্ন এবং কর্মমুখী শিক্ষায় শিক্ষিত করে দেশের সুনাগরিক হিসেবে গড়ে তোলা। প্রযুক্তিনির্ভর এই যুগে কারিগরি শিক্ষার কোনো বিকল্প নেই।',
  principalImage: 'https://via.placeholder.com/150',
  mission: 'শিক্ষার্থীদের যুগোপযোগী কারিগরি ও বাণিজ্যিক জ্ঞান প্রদান করে দক্ষ মানবসম্পদ হিসেবে গড়ে তোলা এবং তাদের মধ্যে সততা, নৈতিকতা ও দেশপ্রেম জাগ্রত করা।',
  vision: 'দেশের অন্যতম সেরা কারিগরি শিক্ষা প্রতিষ্ঠান হিসেবে পরিচিতি লাভ করা এবং এমন একটি প্রজন্ম তৈরি করা যারা ডিজিটাল বাংলাদেশ গঠনে সক্রিয় ভূমিকা পালন করবে।',
  eiin: '১৩২২২০',
  collegeCode: '২০০৩০',
  established: '২০০৩ ইং',
  founder: 'মোঃ মাহবুব আলম (মানিক)',
};

const initialNotices = [
  { id: 1, title: '২০২৪ সালের এসএসসি পরীক্ষার রুটিন', date: '2024-07-15', type: 'file', link: '/files/ssc_routine.pdf' },
  { id: 2, title: 'কলেজের বার্ষিক ক্রীড়া প্রতিযোগিতা', date: '2024-07-10', type: 'link', link: 'https://example.com/sports' }
];

const initialResults = [
    { id: 1, title: 'একাদশ শ্রেণির বার্ষিক পরীক্ষার ফলাফল', date: '2024-06-30', type: 'file', link: '/files/class_xi_results.pdf' },
];

const initialRoutines = [
    { id: 1, title: 'একাদশ শ্রেণির ক্লাস রুটিন (বিজ্ঞান)', date: '2024-07-01', type: 'file', link: '/files/class_xi_routine.pdf' },
];

const initialDigitalContent = [
    { id: 1, title: 'পদার্থবিজ্ঞান প্রথম পত্র লেকচার শিট', date: '2024-07-05', type: 'file', link: '/files/physics_lecture_1.pdf' },
];

const initialGallery = [
  { id: 1, title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩', imageUrl: 'https://via.placeholder.com/400x300' },
  { id: 2, title: 'সাংস্কৃতিক অনুষ্ঠান', imageUrl: 'https://via.placeholder.com/400x300' },
  { id: 3, title: 'পুরস্কার বিতরণী', imageUrl: 'https://via.placeholder.com/400x300' }
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
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // State for all managed data
  const [siteInfo, setSiteInfo] = useState(initialSiteInfo);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [notices, setNotices] = useState(initialNotices);
  const [results, setResults] = useState(initialResults);
  const [routines, setRoutines] = useState(initialRoutines);
  const [digitalContent, setDigitalContent] = useState(initialDigitalContent);
  const [gallery, setGallery] = useState(initialGallery);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchTeachers = useCallback(async () => {
    if (!user) return;
    try {
        const teachersCollectionRef = collection(db, "teachers");
        const data = await getDocs(teachersCollectionRef);
        setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
        console.error("Error fetching teachers:", error);
    }
  }, [user]);

  useEffect(() => {
      if (user) {
          fetchTeachers();
      } else {
          setTeachers([]); // Clear on logout
      }
  }, [user, fetchTeachers]);


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

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will handle setting user to null
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("লগ আউট করার সময় একটি সমস্যা হয়েছে।");
    }
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'site-info':
        return <SiteInfoPage data={siteInfo} setData={setSiteInfo} />;
      case 'teachers':
        return <TeacherManagementPage teachers={teachers} onDataChange={fetchTeachers} />;
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

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold">লোড হচ্ছে...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }


  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
        activePage={activePage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
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
