import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFilePdf, FaFileImage, FaEye, FaDownload, FaArrowLeft, FaFolderOpen, FaBalanceScale } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const CaseOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    const cases = JSON.parse(localStorage.getItem('firmCases') || '[]');
    const foundCase = cases.find(c => String(c.id) === String(id));
    if (foundCase) {
      setCaseData(foundCase);
    } else {
      alert('Case not found!');
      navigate('/dashboard/all-cases');
    }

    const savedFiles = JSON.parse(localStorage.getItem(`case_${id}_files`) || '{}');
    setFileData(savedFiles);
  }, [id, navigate]);

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading Case File...</p>
      </div>
    );
  }

  // Documents ko categories mein divide karne ka logic
  const renderDocuments = () => {
    const sections = [];
    
    Object.keys(fileData).forEach(key => {
      const data = fileData[key];
      if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        Object.keys(data).forEach(category => {
          if (data[category] && data[category].length > 0) {
            sections.push({ category, docs: data[category] });
          }
        });
      } else if (Array.isArray(data) && data.length > 0) {
        sections.push({ category: key === 'customDocs' ? 'General Documents' : key, docs: data });
      }
    });

    if (sections.length === 0) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded border border-dashed border-gray-300 mt-4">
          <p className="text-gray-500 text-sm">Koi documents upload nahi kiye gaye.</p>
        </div>
      );
    }

    return sections.map((section, idx) => (
      <div key={idx} className="mb-6">
        <h3 className="text-md font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
          {section.category}
        </h3>
        <div className="space-y-2">
          {section.docs.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded hover:bg-white transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {doc.fileType?.includes('pdf') ? <FaFilePdf className="text-red-600 text-lg" /> : <FaFileImage className="text-blue-600 text-lg" />}
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{doc.name}</p>
                  <p className="text-xs text-gray-500 truncate">{doc.fileName} • {doc.fileSize}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center gap-1">
                  <FaEye size={10} /> View
                </a>
                <a href={doc.url} download={doc.fileName} className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 flex items-center gap-1">
                  <FaDownload size={10} /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        
        {/* Main Content Area - Gray background to make paper pop */}
        <div className="flex-1 lg:ml-64 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto">
            
            {/* Top Navigation */}
            <div className="mb-4 flex justify-between items-center">
              <button 
                onClick={() => navigate('/dashboard/all-cases')} 
                className="px-4 py-2 bg-white text-gray-700 rounded shadow text-sm font-medium hover:bg-gray-50 flex items-center gap-2 border border-gray-300"
              >
                <FaArrowLeft /> Back to Folders
              </button>
              <span className="text-xs text-gray-500 font-mono">ID: {caseData.id}</span>
            </div>

            {/* THE "PAPER" - A4 Style Layout */}
            <div className="bg-white shadow-2xl p-10 mb-8 border border-gray-300 relative" style={{ minHeight: '297mm' }}>
              
              {/* 1. Firm Header */}
              <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-2xl font-bold text-black uppercase tracking-wider">M/S MEER AHMED MANGRIO & ASSOCIATES</h1>
                <p className="text-xs text-gray-600 mt-1">Advocates & Legal Consultants</p>
              </div>

              {/* 2. Court Name */}
              <div className="text-center mb-8">
                <p className="text-sm font-semibold text-black">In The Court of</p>
                <h2 className="text-lg font-bold text-black uppercase mt-1">{caseData.courtName || '_______________'} Court</h2>
                <p className="text-sm text-black">At {caseData.city || 'Hyderabad'}</p>
              </div>

              {/* 3. Parties (Petitioner vs Respondent) */}
              <div className="flex justify-between items-center mb-8 px-4">
                {/* Left Side */}
                <div className="w-5/12 text-center">
                  <p className="text-xs font-bold text-gray-500 mb-1">Petitioner / Plaintiff</p>
                  <p className="text-lg font-bold text-black border-b border-black pb-1">{caseData.party1Name}</p>
                </div>
                
                {/* Middle VS */}
                <div className="w-2/12 text-center">
                  <FaBalanceScale className="text-3xl text-black mx-auto mb-1" />
                  <p className="text-xl font-black text-black italic">VERSUS</p>
                </div>

                {/* Right Side */}
                <div className="w-5/12 text-center">
                  <p className="text-xs font-bold text-gray-500 mb-1">Respondent / Defendant</p>
                  <p className="text-lg font-bold text-black border-b border-black pb-1">{caseData.party2Name}</p>
                </div>
              </div>

              {/* 4. Subject & Case Details */}
              <div className="mb-8 px-8">
                <p className="text-sm font-bold text-black mb-2">Subject: <span className="font-normal underline">{caseData.subject}</span></p>
                <p className="text-sm font-bold text-black mb-2">Case No: <span className="font-normal">{caseData.caseNo}/{caseData.year}</span></p>
                <p className="text-sm font-bold text-black mb-2">Client: <span className="font-normal">{caseData.clientName}</span></p>
                <p className="text-sm font-bold text-black">Cell No: <span className="font-normal">{caseData.clientCell || 'N/A'}</span></p>
              </div>

              {/* 5. Hearing Table (Empty for now, looks professional) */}
              <div className="mb-12 border border-black">
                <table className="w-full text-xs text-black border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-black p-2 w-1/4">Date of Hearing</th>
                      <th className="border border-black p-2 w-1/4">Particulars</th>
                      <th className="border border-black p-2 w-1/4">Date of Hearing</th>
                      <th className="border border-black p-2 w-1/4">Particulars</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 5 Empty rows for look */}
                    {[...Array(5)].map((_, i) => (
                      <tr key={i}>
                        <td className="border border-black p-4 h-8"></td>
                        <td className="border border-black p-4 h-8"></td>
                        <td className="border border-black p-4 h-8"></td>
                        <td className="border border-black p-4 h-8"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 6. Footer / Signature */}
              <div className="absolute bottom-10 right-10 text-right">
                <p className="text-lg font-bold text-black uppercase">Meer Ahmed Mangrio</p>
                <p className="text-xs text-black">Advocate Supreme Court</p>
                <p className="text-xs text-black">Cell: 0301-3540227</p>
              </div>

            </div>
            {/* END OF PAPER */}

            {/* Documents Section (Outside the paper, but part of the file) */}
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <FaFolderOpen className="text-blue-600" /> Attached Documents
              </h2>
              {renderDocuments()}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseOverview;