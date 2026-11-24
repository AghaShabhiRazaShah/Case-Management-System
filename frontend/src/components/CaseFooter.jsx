import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const CaseFooter = ({ caseData }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/add-case', { state: { formData: caseData, caseId: caseData.id } });
  };

  const handleForward = () => {
    navigate(`/dashboard/case-file/${caseData.id}`);
  };

  const handleSubmit = () => {
    const cases = JSON.parse(localStorage.getItem('firmCases') || '[]');
    const caseIndex = cases.findIndex(c => c.id === caseData.id);
    
    if (caseIndex !== -1) {
      cases[caseIndex].status = 'Submitted'; 
      localStorage.setItem('firmCases', JSON.stringify(cases));
      alert('Case File Successfully Submitted!');
      navigate('/dashboard/all-cases');
    } else {
      alert('Case not found!');
    }
  };

  return (
    <div className="flex justify-end items-center gap-3 pb-6 mt-6 border-t pt-4 dark:border-gray-700">
      {/* Back Arrow - Small & Professional */}
      <button 
        onClick={handleBack} 
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1.5 transition-colors shadow-sm"
      >
        <FaArrowLeft className="text-xs" /> Back
      </button>

      {/* Forward Arrow - Small & Professional */}
      <button 
        onClick={handleForward} 
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1.5 transition-colors shadow-sm"
      >
        Forward <FaArrowRight className="text-xs" />
      </button>

      {/* Submit Button - Compact & Professional */}
      <button 
        onClick={handleSubmit} 
        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
      >
        <FaCheckCircle className="text-xs" /> Submit
      </button>
    </div>
  );
};

export default CaseFooter;