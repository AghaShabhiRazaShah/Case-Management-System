import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import folderImg from '../assets/front.jpg'; // ✅ Folder ki picture import ki

const AllCases = () => {
  const [cases, setCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // ✅ Search ke liye naya state

  useEffect(() => {
    // Sirf wo cases uthayenge jin ka status 'Submitted' hai
    const savedCases = JSON.parse(localStorage.getItem('firmCases') || '[]');
    const submittedCases = savedCases.filter(c => c.status === 'Submitted');
    setCases(submittedCases);
  }, []);

  // ✅ Search Filter Logic: Case Number ya Party Name se match karega
  const filteredCases = cases.filter(caseItem => 
    caseItem.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.party1Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              All Cases (File Folders)
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
              Total Submitted Cases: {cases.length}
            </p>

            {/* ✅ Search Bar Added Here */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by Case Number (e.g., 0333333)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {cases.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Koi submitted case mojood nahi hai. Pehle koi case submit karein.
              </p>
            </div>
          ) : filteredCases.length === 0 ? (
            /* ✅ Agar search se kuch match na ho */
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                "{searchQuery}" se koi case match nahi hua.
              </p>
            </div>
          ) : (
            /* Grid Layout for Folders (Ab filteredCases use honge) */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCases.map((caseItem) => (
                <Link
                  to={`/dashboard/case-overview/${caseItem.id}`}
                  key={caseItem.id}
                  className="relative group block aspect-[3/4] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300 dark:border-gray-600"
                >
                  {/* 1. Folder Background Image */}
                  <img
                    src={folderImg}
                    alt="Case Folder"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* 2. Dark Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>

                  {/* 3. Text Content (Jaise asli file par likha hota hai) */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-gray-900 dark:text-white">
                    
                    {/* Top: Subject & Case No */}
                    <div className="mt-2">
                      <h3 className="font-bold text-lg leading-tight drop-shadow-md text-white truncate">
                        {caseItem.subject || 'Case File'}
                      </h3>
                      <p className="text-sm font-semibold drop-shadow-md text-yellow-300 mt-1">
                        No: {caseItem.caseNo}/{caseItem.year}
                      </p>
                    </div>

                    {/* Bottom: Parties & Court Info */}
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded shadow-sm border border-gray-200 dark:border-gray-600">
                      <p className="truncate text-xs font-bold text-gray-800 dark:text-white">
                        {caseItem.party1Name} <span className="text-red-600 mx-1">VS</span> {caseItem.party2Name}
                      </p>
                      <p className="truncate text-[10px] text-gray-600 dark:text-gray-300 mt-1">
                        Court: {caseItem.courtName}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCases;