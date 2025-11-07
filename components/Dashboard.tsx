import React, { useState } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from './icons/Icons';


// --- Reusable Modal Component ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
                    <h2 id="modal-title" className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none" aria-label="Close modal">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Page Header Component ---
interface PageHeaderProps {
    title: string;
    buttonText?: string;
    onButtonClick?: () => void;
}
const PageHeader: React.FC<PageHeaderProps> = ({ title, buttonText, onButtonClick }) => (
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        {buttonText && onButtonClick && (
            <button onClick={onButtonClick} className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" />
                {buttonText}
            </button>
        )}
    </div>
);


// --- Management Pages ---

// 1. Site Info Page
export const SiteInfoPage: React.FC<{ data: any, setData: (data: any) => void }> = ({ data, setData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setData({ ...data, [e.target.name]: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('তথ্য সংরক্ষণ করা হয়েছে!');
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <PageHeader title="সাইটের সাধারণ তথ্য" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Column 1: Basic Info */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">কলেজের নাম</label>
                            <input type="text" name="collegeName" value={data.collegeName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">স্লোগান</label>
                            <input type="text" name="slogan" value={data.slogan} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">প্রতিষ্ঠাতা</label>
                            <input type="text" name="founder" value={data.founder} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">প্রতিষ্ঠাকাল</label>
                            <input type="text" name="established" value={data.established} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">EIIN</label>
                            <input type="text" name="eiin" value={data.eiin} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                         <div>
                            <label className="block text-gray-700 font-semibold">কলেজ কোড</label>
                            <input type="text" name="collegeCode" value={data.collegeCode} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                    </div>

                    {/* Column 2: Principal Info */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">অধ্যক্ষের নাম</label>
                            <input type="text" name="principalName" value={data.principalName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">অধ্যক্ষের পদবি</label>
                            <input type="text" name="principalDesignation" value={data.principalDesignation} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">অধ্যক্ষের বাণী</label>
                            <textarea name="principalMessage" value={data.principalMessage} onChange={handleChange} rows={8} className="w-full mt-1 p-2 border rounded-md"></textarea>
                        </div>
                         <div>
                            <label className="block text-gray-700 font-semibold">অধ্যক্ষের ছবি</label>
                            <input type="file" name="principalImage" onChange={handleFileChange} className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                            {data.principalImage && <img src={data.principalImage} alt="Principal" className="mt-2 h-24 w-24 rounded-md object-cover" />}
                        </div>
                    </div>

                    {/* Column 3: About & Vision */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">আমাদের সম্পর্কে</label>
                            <textarea name="about" value={data.about} onChange={handleChange} rows={5} className="w-full mt-1 p-2 border rounded-md"></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">লক্ষ্য (Mission)</label>
                            <textarea name="mission" value={data.mission} onChange={handleChange} rows={5} className="w-full mt-1 p-2 border rounded-md"></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">স্বপ্ন (Vision)</label>
                            <textarea name="vision" value={data.vision} onChange={handleChange} rows={5} className="w-full mt-1 p-2 border rounded-md"></textarea>
                        </div>
                         <div>
                            <label className="block text-gray-700 font-semibold">হিরো ইমেজ</label>
                            <input type="file" name="heroImage" onChange={handleFileChange} className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                            {data.heroImage && <img src={data.heroImage} alt="Hero" className="mt-2 h-24 w-full rounded-md object-cover" />}
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t text-right">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">পরিবর্তনগুলি সংরক্ষণ করুন</button>
                </div>
            </form>
        </div>
    );
};

// 2. Teacher Management Page
export const TeacherManagementPage: React.FC<{ teachers: any[], setTeachers: (teachers: any[]) => void }> = ({ teachers, setTeachers }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setModalOpen(true);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('আপনি কি নিশ্চিত? এই শিক্ষকের তথ্য মুছে ফেলা হবে।')) {
            setTeachers(teachers.filter(teacher => teacher.id !== id));
            alert('শিক্ষকের তথ্য সফলভাবে মুছে ফেলা হয়েছে!');
        }
    };
    
    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const designation = (form.elements.namedItem('designation') as HTMLInputElement).value;
        const qualification = (form.elements.namedItem('qualification') as HTMLInputElement).value;
        const photo = (form.elements.namedItem('photo') as HTMLInputElement).value;
        
        const teacherData = { name, designation, qualification, photo };

        if (editingItem) {
            setTeachers(teachers.map(t => t.id === editingItem.id ? { ...t, ...teacherData } : t));
            alert('শিক্ষকের তথ্য সফলভাবে আপডেট করা হয়েছে!');
        } else {
            setTeachers([...teachers, { id: Date.now(), ...teacherData, photo: photo || 'https://placehold.co/100x100/any/any/png?text=New' }]);
            alert('নতুন শিক্ষক সফলভাবে যোগ করা হয়েছে!');
        }
        
        setModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div>
            <PageHeader title="শিক্ষক ব্যবস্থাপনা" buttonText="নতুন শিক্ষক যোগ" onButtonClick={handleAdd} />
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left">ছবি</th>
                            <th className="p-4 text-left">নাম</th>
                            <th className="p-4 text-left">পদবি</th>
                            <th className="p-4 text-left">যোগ্যতা</th>
                            <th className="p-4 text-left">একশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-6 text-gray-500">কোনো শিক্ষকের তথ্য পাওয়া যায়নি।</td>
                            </tr>
                        ) : (
                            teachers.map(teacher => (
                                <tr key={teacher.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4"><img src={teacher.photo} alt={teacher.name} className="w-12 h-12 rounded-full object-cover" /></td>
                                    <td className="p-4">{teacher.name}</td>
                                    <td className="p-4">{teacher.designation}</td>
                                    <td className="p-4">{teacher.qualification}</td>
                                    <td className="p-4 flex space-x-2">
                                        <button onClick={() => handleEdit(teacher)} className="text-blue-600 hover:text-blue-800"><PencilIcon /></button>
                                        <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-800"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "শিক্ষকের তথ্য সম্পাদনা" : "নতুন শিক্ষক যোগ করুন"}>
                <form onSubmit={handleSave}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">নাম</label>
                            <input name="name" type="text" defaultValue={editingItem?.name} className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                         <div>
                            <label className="block text-gray-700">পদবি</label>
                            <input name="designation" type="text" defaultValue={editingItem?.designation} className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                         <div>
                            <label className="block text-gray-700">যোগ্যতা</label>
                            <input name="qualification" type="text" defaultValue={editingItem?.qualification} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-gray-700">ছবি (লিঙ্ক)</label>
                            <input name="photo" type="text" defaultValue={editingItem?.photo} className="w-full mt-1 p-2 border rounded-md" placeholder="https://example.com/photo.jpg" />
                            <p className="text-xs text-gray-500 mt-1">আপাতত ছবির লিঙ্ক দিন। ফাইল আপলোড পরে যোগ করা হবে।</p>
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                         <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 mr-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">বাতিল</button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">সংরক্ষণ</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

// 3. Generic Content Management Page (Notices, Results, etc.)
export const ContentManagerPage: React.FC<{ title: string, data: any[], setData: (data: any[]) => void }> = ({ title, data, setData }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setModalOpen(true);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('আপনি কি নিশ্চিত? এই আইটেমটি মুছে ফেলা হবে।')) {
            setData(data.filter(item => item.id !== id));
        }
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const newItem = {
            title: (form.elements.namedItem('title') as HTMLInputElement).value,
            date: (form.elements.namedItem('date') as HTMLInputElement).value,
            type: (form.elements.namedItem('type') as HTMLSelectElement).value,
            link: (form.elements.namedItem('link') as HTMLInputElement).value,
        };

        if (editingItem) {
            setData(data.map(item => item.id === editingItem.id ? { ...item, ...newItem } : item));
        } else {
            setData([...data, { id: Date.now(), ...newItem }]);
        }
        setModalOpen(false);
        setEditingItem(null);
    };

    return (
        <div>
            <PageHeader title={title} buttonText="নতুন যোগ করুন" onButtonClick={handleAdd} />
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left">শিরোনাম</th>
                            <th className="p-4 text-left">তারিখ</th>
                            <th className="p-4 text-left">টাইপ</th>
                            <th className="p-4 text-left">একশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                                <td className="p-4">{item.title}</td>
                                <td className="p-4">{item.date}</td>
                                <td className="p-4 capitalize">{item.type}</td>
                                <td className="p-4 flex space-x-2">
                                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800"><PencilIcon /></button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "সম্পাদনা করুন" : "নতুন যোগ করুন"}>
                <form onSubmit={handleSave}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">শিরোনাম</label>
                            <input name="title" type="text" defaultValue={editingItem?.title} className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">তারিখ</label>
                            <input name="date" type="date" defaultValue={editingItem?.date || new Date().toISOString().slice(0, 10)} className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">টাইপ</label>
                            <select name="type" defaultValue={editingItem?.type || 'file'} className="w-full mt-1 p-2 border rounded-md bg-white">
                                <option value="file">ফাইল</option>
                                <option value="link">লিঙ্ক</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">লিঙ্ক/ফাইলের পথ</label>
                            <input name="link" type="text" defaultValue={editingItem?.link} className="w-full mt-1 p-2 border rounded-md" placeholder="#" />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                         <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 mr-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">বাতিল</button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">সংরক্ষণ</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

// 4. Gallery Management Page
export const GalleryManagementPage: React.FC<{ data: any[], setData: (data: any[]) => void }> = ({ data, setData }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = (id: number) => {
        if (window.confirm('আপনি কি নিশ্চিত? এই ছবিটি মুছে ফেলা হবে।')) {
            setData(data.filter(image => image.id !== id));
        }
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const imageUrl = (form.elements.namedItem('imageUrl') as HTMLInputElement).value;
        const newImage = {
            id: Date.now(),
            title,
            imageUrl: imageUrl || `https://placehold.co/400x300/cccccc/FFFFFF/png?text=${encodeURIComponent(title)}`
        };
        setData([newImage, ...data]);
        setModalOpen(false);
    };

    return (
         <div>
            <PageHeader title="গ্যালারি ব্যবস্থাপনা" buttonText="নতুন ছবি যোগ" onButtonClick={() => setModalOpen(true)} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map(image => (
                    <div key={image.id} className="relative group bg-white rounded-lg shadow overflow-hidden">
                        <img src={image.imageUrl} alt={image.title} className="w-full h-40 object-cover" />
                        <div className="p-2">
                             <h3 className="text-sm font-semibold truncate">{image.title}</h3>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleDelete(image.id)} className="text-white hover:text-red-400 p-2"><TrashIcon className="w-6 h-6" /></button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="নতুন ছবি যোগ করুন">
                 <form onSubmit={handleSave}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">ছবির শিরোনাম</label>
                            <input name="title" type="text" className="w-full mt-1 p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">ছবির লিঙ্ক (URL)</label>
                            <input name="imageUrl" type="url" className="w-full mt-1 p-2 border rounded-md" placeholder="https://example.com/image.jpg" />
                            <p className="text-xs text-gray-500 mt-1">লিঙ্ক না দিলে একটি প্লেসহোল্ডার ছবি তৈরি হবে।</p>
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                         <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 mr-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">বাতিল</button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">যোগ করুন</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};


// 5. Contact Management Page
export const ContactManagementPage: React.FC<{ data: any, setData: (data: any) => void }> = ({ data, setData }) => {
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('যোগাযোগের তথ্য সংরক্ষণ করা হয়েছে!');
    };
     return (
        <div className="bg-white rounded-lg shadow p-6">
            <PageHeader title="যোগাযোগের তথ্য" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700">ঠিকানা</label>
                        <input type="text" name="address" value={data.address} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                     <div>
                        <label className="block text-gray-700">ফোন</label>
                        <input type="text" name="phone" value={data.phone} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-gray-700">ইমেইল</label>
                        <input type="email" name="email" value={data.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                     <div>
                        <label className="block text-gray-700">অফিসের সময়</label>
                        <input type="text" name="officeHours" value={data.officeHours} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700">গুগল ম্যাপের লিঙ্ক</label>
                        <input type="url" name="mapLink" value={data.mapLink} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">সংরক্ষণ করুন</button>
                </div>
            </form>
        </div>
    );
};


// --- Main Dashboard Component ---

const cardData = [
    {
        id: 'site-info',
        title: 'সাইটের সাধারণ তথ্য',
        description: 'কলেজের নাম, ঠিকানা, ছবি, অধ্যক্ষের বাণী ইত্যাদি পরিবর্তন করুন।',
    },
    {
        id: 'teachers',
        title: 'শিক্ষক ব্যবস্থাপনা',
        description: 'শিক্ষকদের তালিকা, ছবি ও তথ্য যোগ, পরিবর্তন বা মুছে ফেলুন।',
    },
    {
        id: 'notices',
        title: 'নোটিশ ব্যবস্থাপনা',
        description: 'নতুন নোটিশ যোগ করুন, পুরনো নোটিশ সম্পাদনা বা মুছে ফেলুন।',
    },
    {
        id: 'results',
        title: 'ফলাফল ব্যবস্থাপনা',
        description: 'পরীক্ষার ফলাফল আপলোড, সম্পাদনা বা মুছে ফেলুন।',
    },
    {
        id: 'routines',
        title: 'রুটিন ব্যবস্থাপনা',
        description: 'ক্লাস ও পরীক্ষার রুটিন যোগ, সম্পাদনা বা মুছে ফেলুন।',
    },
    {
        id: 'digital-content',
        title: 'ডিজিটাল কনটেন্ট',
        description: 'লেকচার শিট, ভিডিও লেকচার ইত্যাদি যোগ বা মুছে ফেলুন।',
    },
    {
        id: 'gallery',
        title: 'গ্যালারি ব্যবস্থাপনা',
        description: 'গ্যালারিতে নতুন ছবি যোগ করুন, পুরনো ছবি সম্পাদনা বা মুছে ফেলুন।',
    },
    {
        id: 'contact',
        title: 'যোগাযোগের তথ্য',
        description: 'কলেজের ঠিকানা, ফোন, ইমেইল এবং অফিসের সময় পরিবর্তন করুন।',
    },
];

const DashboardCard: React.FC<{ title: string; description: string; onClick: () => void }> = ({ title, description, onClick }) => (
    <button onClick={onClick} className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </button>
);

const Dashboard: React.FC<{ onNavigate: (pageId: string) => void }> = ({ onNavigate }) => {
    return (
        <div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                 <h2 className="text-2xl font-semibold text-gray-800">এডমিন প্যানেলে স্বাগতম</h2>
                 <p className="text-gray-600 mt-2">এখান থেকে আপনি ওয়েবসাইটের বিভিন্ন অংশ ব্যবস্থাপনা করতে পারবেন। প্রয়োজনীয় অপশন নির্বাচন করুন।</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardData.map((card) => (
                    <DashboardCard key={card.id} title={card.title} description={card.description} onClick={() => onNavigate(card.id)} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
