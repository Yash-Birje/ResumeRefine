import { createContext, useContext, useState, useCallback } from 'react';
import * as resumeService from '../api/resumeService';
import { useAuth } from '../hooks/useAuth';

// Create Resume Context
const ResumeContext = createContext(null);

// Custom hook to use resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};

// Resume Provider Component
export const ResumeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentResume, setCurrentResume] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load all resumes for current user
   */
  const loadResumes = useCallback(async () => {
    if (!currentUser) {
      setResumes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await resumeService.getUserResumes(currentUser.id);

      if (result.success) {
        setResumes(result.resumes);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load resumes');
      console.error('Load resumes error:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);
  
  /**
   * Load a specific resume by ID
   * @param {string} resumeId - Resume ID
   */
  const loadUserResume = async (resumeId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await resumeService.getResumeById(resumeId);

      if (result.success) {
        setCurrentResume(result.resume);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to load resume';
      setError(errorMessage);
      console.error('Load resume error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);
    
    try{
      //call fxn from resumeService
      const result = await resumeService.createResume(currentUser.id);
      if(result.success){
        setCurrentResume(result.resume);
        await loadResumes();
        return {success : true, resume: result.resume};
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    }catch(err){
      const errorMessage = 'Failed to create resume';
      setError(errorMessage);
      console.error('Create resume error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  } 

  /**
   * Save/update current resume
   * @param {object} updates - Resume updates
   */
  const saveResume = async (updates) => {
    if(!currentResume) {
      return { success: false, error: 'No resume loaded' };
    }

    try{
      const result = await resumeService.updateResume(currentResume.id, updates);

      if (result.success) {
        setCurrentResume(result.resume);
        // Update in resumes list
        setResumes(prev =>
          prev.map(r => (r.id === result.resume.id ? result.resume : r))
        );
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    }catch(err){
      const errorMessage = 'Failed to save resume';
      setError(errorMessage);
      console.error('Save resume error:', err);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * @param {object} updates - Resume updates
   * autosave fxn again i think it can fail but we will see
   */
  const autoSave = async (updates) => {
    if (!currentResume) return;

    try {
      const result = await resumeService.autoSaveResume(currentResume.id, updates);

      if (result.success) {
        setCurrentResume(result.resume);
        // Update in resumes list silently
        setResumes(prev =>
          prev.map(r => (r.id === result.resume.id ? result.resume : r))
        );
      }
    } catch (err) {
      console.error('Auto-save error:', err);
      // Silently fail for auto-save
    }
  };

   /**
   * Delete a resume
   * @param {string} resumeId - Resume ID
   */
  const deleteResume = async (resumeId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await resumeService.deleteResume(resumeId);

      if (result.success) {
        setResumes(prev => prev.filter(r => r.id !== resumeId));
        if (currentResume?.id === resumeId) {
          setCurrentResume(null);
        }
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to delete resume';
      setError(errorMessage);
      console.error('Delete resume error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };


  /**
   * Duplicate a resume
   * @param {string} resumeId - Resume ID
   * this one too i think this one will fail let's see during debugging afterwards hehe :)
   */
  const duplicateResume = async (resumeId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await resumeService.duplicateResume(resumeId);

      if (result.success) {
        await loadResumes();
        return { success: true, resume: result.resume };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to duplicate resume';
      setError(errorMessage);
      console.error('Duplicate resume error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

   /**
   * Update current resume fields directly (for form editing)
   * @param {object} updates - Fields to update
   */
  const updateCurrentResume = (updates) => {
    if (currentResume) {
      setCurrentResume(prev => ({ ...prev, ...updates }));
    }
  };

  /**
   * Clear error
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Clear current resume
   */
  const clearCurrentResume = () => {
    setCurrentResume(null);
  };

  const value = {
    currentResume,
    resumes,
    loading,
    error,
    loadResumes,
    loadUserResume,
    createResume,
    saveResume,
    autoSave,
    deleteResume,
    duplicateResume,
    updateCurrentResume,
    clearError,
    clearCurrentResume
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

export default ResumeContext;
