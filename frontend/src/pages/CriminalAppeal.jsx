import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUpload, FaFilePdf, FaFileImage, FaTrash, FaPlus, FaFileAlt, FaEye, FaEdit } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CaseFooter from '../components/CaseFooter';


const CriminalAppeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [caseData, setCaseData] = useState(null);
  const [appealCategory, setAppealCategory] = useState('');
  const [isCustomAppeal, setIsCustomAppeal] = useState(false);
  const [activeAppealCategory, setActiveAppealCategory] = useState('');
  
  const [appealDynamicDocs, setAppealDynamicDocs] = useState({
    'Memo': [],
    'Copy against the order': [],
    'Statements of PWs along with exhibits': [],
    'Statements of accused judgement': []
  });
  
  const [newDocName, setNewDocName] = useState('');
  const [newDocFile, setNewDocFile] = useState(null);
  const [searchDoc, setSearchDoc] = useState('');

  useEffect(() => {
    const cases = JSON.parse(localStorage.getItem('firmCases') || '[]');
    const foundCase = cases.find(c => c.id.toString() === id);
    if (foundCase) {
      setCaseData(foundCase);
      const savedFiles = JSON.parse(localStorage.getItem(`case_${id}_files`) || '{}');
      
      if (savedFiles.appealDynamicDocs) setAppealDynamicDocs(savedFiles.appealDynamicDocs);
      
      if (savedFiles.appealCategory) {
        if (savedFiles.appealCategory === 'Others') {
          setIsCustomAppeal(true);
          setAppealCategory('');
        } else {
          setIsCustomAppeal(false);
          setAppealCategory(savedFiles.appealCategory);
          setActiveAppealCategory(savedFiles.appealCategory);
        }
      }
    } else {
      alert('Case not found!');
      navigate('/dashboard/case-file');
    }
  }, [id, navigate]);

  const saveFiles = (key, files) => {
    const allFiles = JSON.parse(localStorage.getItem(`case_${id}_files`) || '{}');
    allFiles[key] = files;
    localStorage.setItem(`case_${id}_files`, JSON.stringify(allFiles));
  };

  const handleAppealCategoryChange = (e) => {
    const val = e.target.value;
    if (val === 'Others') {
      setIsCustomAppeal(true);
      setAppealCategory('');
      setActiveAppealCategory('');
    } else {
      setIsCustomAppeal(false);
      setAppealCategory(val);
      setActiveAppealCategory(val);
      saveFiles('appealCategory', val);
    }
  };

  const handleAddDynamicDoc = () => {
    if (!newDocName.trim() || !newDocFile) {
      alert('Please enter a document name and select a file!');
      return;
    }
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(newDocFile.type)) {
      alert('Only JPG, PNG, and PDF files are allowed!');
      return;
    }
    const newDoc = {
      id: Date.now(),
      name: newDocName.trim(),
      fileName: newDocFile.name,
      fileType: newDocFile.type,
      fileSize: (newDocFile.size / 1024).toFixed(2) + ' KB',
      date: new Date().toLocaleString(),
      url: URL.createObjectURL(newDocFile)
    };

    const categoryKey = isCustomAppeal ? appealCategory : activeAppealCategory;
    const currentList = appealDynamicDocs[categoryKey] || [];
    const updatedList = [...currentList, newDoc];
    const updatedDocs = { ...appealDynamicDocs, [categoryKey]: updatedList };

    setAppealDynamicDocs(updatedDocs);
    saveFiles('appealDynamicDocs', updatedDocs);

    setNewDocName('');
    setNewDocFile(null);
    const fileInput = document.getElementById('appeal-dynamic-file-input');
    if (fileInput) fileInput.value = '';
  };

  const handleDeleteDynamicDoc = (docId) => {
    const categoryKey = isCustomAppeal ? appealCategory : activeAppealCategory;
    const currentList = appealDynamicDocs[categoryKey] || [];
    const updatedList = currentList.filter(doc => doc.id !== docId);
    const updatedDocs = { ...appealDynamicDocs, [categoryKey]: updatedList };

    setAppealDynamicDocs(updatedDocs);
    saveFiles('appealDynamicDocs', updatedDocs);
  };

  const getFileIcon = (type) => {
    if (type && type.includes('pdf')) return <FaFilePdf className="text-red-500 text-xl" />;
    return <FaFileImage className="text-blue-500 text-xl" />;
  };

  if (!caseData) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <div className="flex-1 lg:ml-64 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Criminal Appeal (Cr. Appeal)</h1>
              <p className="text-gray-600 dark:text-gray-400">{caseData.caseNo}/{caseData.year} - {caseData.party1Name} VS {caseData.party2Name}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-l-4 border-primary-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><p className="text-xs text-gray-500 uppercase">Court</p><p className="font-semibold text-gray-800 dark:text-white">{caseData.courtName}</p></div>
                <div><p className="text-xs text-gray-500 uppercase">Case Type</p><p className="font-semibold text-gray-800 dark:text-white">{caseData.caseCategory}</p></div>
                <div><p className="text-xs text-gray-500 uppercase">Client</p><p className="font-semibold text-gray-800 dark:text-white">{caseData.clientName}</p></div>
                <div><p className="text-xs text-gray-500 uppercase">Status</p><p className="font-semibold text-primary-600">{caseData.result}</p></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FaPlus /> Select Category of Document
              </h3>

              {isCustomAppeal ? (
                <div className="flex gap-2">
                  <input type="text" value={appealCategory} onChange={(e) => { setAppealCategory(e.target.value); saveFiles('customAppealCategory', e.target.value); }} placeholder="Enter your custom document category..." className="w-full p-2 border-2 border-primary-500 rounded dark:bg-gray-700 dark:border-primary-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" autoFocus />
                  <button type="button" onClick={() => { setIsCustomAppeal(false); setAppealCategory(''); saveFiles('appealCategory', ''); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm font-medium">✕</button>
                </div>
              ) : (
                <select value={appealCategory} onChange={handleAppealCategoryChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="">-- Select Category of Document --</option>
                  <option value="Memo">Memo</option>
                  <option value="Copy against the order">Copy against the order</option>
                  <option value="Statements of PWs along with exhibits">Statements of PWs along with exhibits</option>
                  <option value="Statements of accused judgement">Statements of accused judgement</option>
                  <option value="Others">Others (Custom Input)</option>
                </select>
              )}

              {(activeAppealCategory || isCustomAppeal) && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaUpload /> Upload Documents for: <span className="text-primary-600 ml-2">{isCustomAppeal ? appealCategory : activeAppealCategory}</span>
                  </h4>

                  <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Name</label>
                      <input type="text" value={newDocName} onChange={(e) => setNewDocName(e.target.value)} placeholder="e.g., Application, Affidavit, CNIC, etc." className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select File</label>
                      <input id="appeal-dynamic-file-input" type="file" onChange={(e) => setNewDocFile(e.target.files[0])} className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white text-sm" />
                    </div>
                    <div className="flex items-end">
                      <button onClick={handleAddDynamicDoc} className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2 transition-colors">
                        <FaPlus /> Add Document
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchDoc}
                        onChange={(e) => setSearchDoc(e.target.value)}
                        placeholder=" Search documents by name..."
                        className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* ✅ FIXED: Added || [] to prevent undefined error */}
                    {(appealDynamicDocs[isCustomAppeal ? appealCategory : activeAppealCategory] || []).filter((doc) => 
                      doc.name.toLowerCase().includes(searchDoc.toLowerCase()) ||
                      doc.fileName.toLowerCase().includes(searchDoc.toLowerCase())
                    ).length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          {searchDoc 
                            ? `No documents found matching "${searchDoc}"` 
                            : `No documents added yet for ${isCustomAppeal ? appealCategory : activeAppealCategory}. Use the form above to add documents.`}
                        </p>
                      </div>
                    ) : (
                      (appealDynamicDocs[isCustomAppeal ? appealCategory : activeAppealCategory] || [])
                        .filter((doc) => 
                          doc.name.toLowerCase().includes(searchDoc.toLowerCase()) ||
                          doc.fileName.toLowerCase().includes(searchDoc.toLowerCase())
                        )
                        .map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                {getFileIcon(doc.fileType)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-800 dark:text-white text-lg truncate">{doc.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {doc.fileName} • {doc.fileSize} • {doc.date}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() => window.open(doc.url, '_blank')}
                                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                title="View Document"
                              >
                                <FaEye /> View
                              </button>

                              <button
                                onClick={() => handleDeleteDynamicDoc(doc.id)}
                                className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Delete Document"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>
   

   <CaseFooter caseData={caseData} />



          </div>
        </div>
      </div>
    </div>
  );
};

export default CriminalAppeal;