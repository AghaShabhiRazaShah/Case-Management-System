import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ✅ 1. FaTrash icon add kiya gaya hai
import { FaCalendar, FaList, FaSearch, FaFilter, FaGavel, FaClock, FaFolderOpen, FaCheckCircle, FaTimes, FaPlus, FaEye, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const CaseFile = () => {
  const { t } = useLanguage();
  
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Separate Filters
  const [courtFilter, setCourtFilter] = useState('');
  const [caseTypeFilter, setCaseTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');

  // REAL DATA STATE
  const [cases, setCases] = useState([]);

  // USE EFFECT: Component load hote hi localStorage se real data fetch karega
  useEffect(() => {
    const savedCases = JSON.parse(localStorage.getItem('firmCases') || '[]');
    setCases(savedCases);
  }, []);

  // DYNAMIC FILTERS
  const courts = [...new Set(cases.map(c => c.courtName).filter(Boolean))].sort();
  const caseTypes = [...new Set(cases.map(c => c.caseCategory).filter(Boolean))].sort();
  const years = [...new Set(cases.map(c => c.year).filter(Boolean))].sort().reverse();
  const stages = [...new Set(cases.map(c => c.status || 'Pending').filter(Boolean))].sort();

  // REAL FILTER LOGIC
  const filteredCases = cases.filter(c => {
    const stage = c.status || 'Pending';
    const caseNoFull = `${c.caseNo}/${c.year}`;
    
    const matchesSearch = 
      (c.caseNo && c.caseNo.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (c.clientName && c.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.courtName && c.courtName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      caseNoFull.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourt = courtFilter ? c.courtName === courtFilter : true;
    const matchesCaseType = caseTypeFilter ? c.caseCategory === caseTypeFilter : true;
    const matchesYear = yearFilter ? String(c.year) === yearFilter : true;
    const matchesStage = stageFilter ? stage === stageFilter : true;

    return matchesSearch && matchesCourt && matchesCaseType && matchesYear && matchesStage;
  });

  // ✅ 2. DELETE FUNCTION: Case aur uski files localStorage se hata deta hai
  const handleDeleteCase = (caseId) => {
    if (window.confirm("Are you sure you want to delete this case? This action cannot be undone.")) {
      // 1. Cases list se ye case nikal do
      const savedCases = JSON.parse(localStorage.getItem('firmCases') || '[]');
      const updatedCases = savedCases.filter(c => c.id !== caseId);
      localStorage.setItem('firmCases', JSON.stringify(updatedCases));
      
      // 2. Is case ki uploaded documents bhi saaf karo (memory cleanup)
      localStorage.removeItem(`case_${caseId}_files`);
      
      // 3. Screen foran update ho jaye (page reload ke baghair)
      setCases(updatedCases);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setCourtFilter('');
    setCaseTypeFilter('');
    setYearFilter('');
    setStageFilter('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64 p-6">
          {/* Header with New Case Button */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Link to="/dashboard/add-case" className="flex items-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-lg shadow-lg transition-all">
              <FaPlus /> {t('newCaseFile') || 'New Case File'}
            </Link>
          </div>

          {/* Search & Multiple Filters */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={t('searchPlaceholder') || 'Search by Case No, Client, or Court...'}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-gray-400 hover:text-red-500">
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{t('court') || 'Court'}</label>
                <select value={courtFilter} onChange={(e) => setCourtFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500">
                  <option value="">{t('allCourts') || 'All Courts'}</option>
                  {courts.map(court => <option key={court} value={court}>{court}</option>)}
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{t('caseType') || 'Case Type'}</label>
                <select value={caseTypeFilter} onChange={(e) => setCaseTypeFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500">
                  <option value="">{t('allTypes') || 'All Types'}</option>
                  {caseTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{t('year') || 'Year'}</label>
                <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500">
                  <option value="">{t('allYears') || 'All Years'}</option>
                  {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{t('stage') || 'Stage/Status'}</label>
                <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500">
                  <option value="">{t('allStages') || 'All Stages'}</option>
                  {stages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                </select>
              </div>

              <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                <FaTimes /> {t('clear') || 'Clear'}
              </button>

              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 ml-auto">
                <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow text-primary-700 dark:text-accent-400 font-semibold' : 'text-gray-500'}`}>
                  <FaList /> {t('list') || 'List'}
                </button>
                <button onClick={() => setViewMode('calendar')} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-gray-600 shadow text-primary-700 dark:text-accent-400 font-semibold' : 'text-gray-500'}`}>
                  <FaCalendar /> {t('calendar') || 'Calendar'}
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(courtFilter || caseTypeFilter || yearFilter || stageFilter) && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{t('activeFilters') || 'Active Filters'}:</span>
                {courtFilter && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">{t('court')}: {courtFilter}</span>}
                {caseTypeFilter && <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">{t('type')}: {caseTypeFilter}</span>}
                {yearFilter && <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">{t('year')}: {yearFilter}</span>}
                {stageFilter && <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded">{t('stage')}: {stageFilter}</span>}
              </div>
            )}
          </div>

          {/* List View Table */}
          {viewMode === 'list' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-4">{t('caseNumber') || 'Case Number'}</th>
                      <th className="px-6 py-4">{t('court') || 'Court'}</th>
                      <th className="px-6 py-4">{t('client') || 'Client'}</th>
                      <th className="px-6 py-4">{t('stage') || 'Stage/Status'}</th>
                      <th className="px-6 py-4">{t('action') || 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredCases.length > 0 ? (
                      filteredCases.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-primary-700 dark:text-accent-400">
                            {c.caseNo}/{c.year}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <FaGavel className="text-primary-600 dark:text-accent-400" />
                              {c.courtName || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
                            {c.clientName || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              c.status === 'Submitted' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>
                              {c.status || 'Pending'}
                            </span>
                          </td>
                          
                          {/* ✅ 3. ACTION COLUMN: View aur Delete dono buttons */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <Link 
                                to={`/dashboard/case-overview/${c.id}`} 
                                className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-accent-400 hover:underline font-medium"
                              >
                                <FaEye className="text-xs" /> {t('viewDetails') || 'View File'}
                              </Link>
                              
                              <button 
                                onClick={() => handleDeleteCase(c.id)}
                                className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 hover:underline font-medium transition-colors"
                                title="Delete Case"
                              >
                                <FaTrash className="text-xs" /> Delete
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          <FaFolderOpen className="text-4xl mx-auto mb-3 opacity-50" />
                          <p className="text-lg font-medium">{t('noHearingsFound') || 'No cases found matching your filters.'}</p>
                          <button onClick={clearFilters} className="mt-2 text-primary-600 dark:text-accent-400 hover:underline font-semibold">
                            {t('clearAllFilters') || 'Clear all filters'}
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Calendar View Placeholder */}
          {viewMode === 'calendar' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
              <FaCalendar className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">{t('calendarView') || 'Calendar View'}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{t('comingSoon') || 'Coming Soon'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseFile;