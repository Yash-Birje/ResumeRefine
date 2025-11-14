import { DEFAULT_RESUME, STORAGE_KEYS } from "../utils/constants";
import { useRef,useEffect} from "react";
// fxn to simulate delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// get resumes from localStorage
export const getResumes = () => {
  const resumes = localStorage.getItem(STORAGE_KEYS.RESUMES);
  return resumes ? JSON.parse(resumes) : [];
}

// save resumes to localStorage
const saveResumes = (resumes) => {
  localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
}


/**
 * Get all resumes for a specific user
 * @param {string} userId - User ID
 * @returns {Promise<{success: boolean, resumes?: array, error?: string}>}
 */
export const getUserResumes = async (userId) => {
  await delay(500); // simulate network delay
  //finding user resumes
  //error handling hehehehe
  try{
  const allResumes = getResumes();
  const userResumes = allResumes.filter(resume => resume.userId === userId);
  return { 
    success: true, 
    resumes: userResumes 
    };
  } catch (error) {
    console.error('Error loading resumes:', error);
    return { 
      success: false, 
      error: 'Failed to load resumes. Please try again.'
    };
  }
};

/** 
 * Get a specific resume by ID
 * @param {string} resumeId - Resume ID
 * @param {string} userId - User ID
 * @returns {Promise<{success: boolean, resume?: object, error?: string}>}
 */
export const getResumeById = async (resumeId, userId) => {
  await delay(500); // simulate network delay
  //error handling
  try{
    const allResumes = getResumes();
    const resume = allResumes.find(r => r.id === resumeId && r.userId === userId);
    if (!resume) {
      return { 
        success: false, 
        error: 'Resume not found' 
      };
    } else {
      return { 
        success: true, 
        resume 
      };
    }
  } catch(error){
    console.error('Error loading resume:', error);
    return { 
      success: false, 
      error: 'Failed to load resume. Please try again.' 
    };
  }
};

/**
 * Create a new resume
 * @param {string} userId - User ID
 * @param {object} userData - User data (name, email) for pre-filling
 * @returns {Promise<{success: boolean, resume?: object, error?: string}>}
 */
export const createResume = async (userId, userData) => {
  await delay(500); //read in older fxns why we did this
  try{
    const newResume = {
      ...DEFAULT_RESUME,
      id: crypto.randomUUID(), //not so simple unique ID
      userId,
      personalInfo: {
        ...DEFAULT_RESUME.personalInfo,
        fullName: userData.name || '',
        email: userData.email || '',
      }
    }
    const allResumes = getResumes();
    allResumes.push(newResume);//add to resumes array
    saveResumes(allResumes);//saving new resume
    return { 
      success: true, 
      resume: newResume 
    };
  } catch (error) {
    console.error('Error creating resume:', error);
    return { 
      success: false, 
      error: 'Failed to create resume. Please try again.'
    };
  }
};

/**
 * Update an existing resume
 * @param {string} resumeId - Resume ID
 * @param {object} updates - Updated resume data
 * @returns {Promise<{success: boolean, resume?: object, error?: string}>}
 */
export const updateResume = async (resumeId, updates) => {
  await delay(200);

  try {
    const allResumes = getResumes();
    const resumeIndex = allResumes.findIndex(r => r.id === resumeId);

    if (resumeIndex === -1) {
      return {
        success: false,
        error: 'Resume not found'
      };
    }

    // Merge updates with existing resume
    const updatedResume = {
      ...allResumes[resumeIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    allResumes[resumeIndex] = updatedResume;
    saveResumes(allResumes);

    return {
      success: true,
      resume: updatedResume
    };
  } catch (error) {
    console.error('Error updating resume:', error);
    return {
      success: false,
      error: 'Failed to update resume'
    };
  }
};

/**
 * Delete a resume
 * @param {string} resumeId - Resume ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteResume = async (resumeId) => {
  await delay(200);

  try {
    const allResumes = getResumes();
    const filteredResumes = allResumes.filter(r => r.id !== resumeId);

    if (filteredResumes.length === allResumes.length) {
      return {
        success: false,
        error: 'Resume not found'
      };
    }

    saveResumes(filteredResumes);

    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting resume:', error);
    return {
      success: false,
      error: 'Failed to delete resume'
    };
  }
};

/**
 * Duplicate a resume
 * @param {string} resumeId - Resume ID to duplicate
 * @returns {Promise<{success: boolean, resume?: object, error?: string}>}
 */
export const duplicateResume = async (resumeId) => {
  await delay(300);

  try {
    const allResumes = getResumes();
    const originalResume = allResumes.find(r => r.id === resumeId);

    if (!originalResume) {
      return {
        success: false,
        error: 'Resume not found'
      };
    }

    // Create duplicate with new ID and updated title
    const duplicatedResume = {
      ...originalResume,
      id: crypto.randomUUID ? crypto.randomUUID() : `resume-${Date.now()}`,
      title: `Copy of ${originalResume.title}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    allResumes.push(duplicatedResume);
    saveResumes(allResumes);

    return {
      success: true,
      resume: duplicatedResume
    };
  } catch (error) {
    console.error('Error duplicating resume:', error);
    return {
      success: false,
      error: 'Failed to duplicate resume'
    };
  }
};

/**
 * Auto-save resume (no delay for immediate save)
 * @param {string} resumeId - Resume ID
 * @param {object} updates - Updated resume data
 * @returns {Promise<{success: boolean, resume?: object, error?: string}>}
 */
export const autoSaveResume = async (resumeId, updates) => {
  // No artificial delay for auto-save
  try {
    const allResumes = getResumes();
    const resumeIndex = allResumes.findIndex(r => r.id === resumeId);

    if (resumeIndex === -1) {
      return {
        success: false,
        error: 'Resume not found'
      };
    }

    const updatedResume = {
      ...allResumes[resumeIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    allResumes[resumeIndex] = updatedResume;
    saveResumes(allResumes);

    return {
      success: true,
      resume: updatedResume
    };
  } catch (error) {
    console.error('Error auto-saving resume:', error);
    return {
      success: false,
      error: 'Auto-save failed'
    };
  }
};
//trying to make a safer auto save fxn currently not functional
// export const saferAutoSaveResume = (resumeId,t = 1000) => {//to save after one second
//   const timer = useRef(null);
//   const lastSnapshot = useRef(null);
//   const savingRef = useRef(false);
//   useEffect(() => {
//     if(!resumeId) return;
//     clearTimeout(timer.current);

//     const snapShot = JSON.stringify({
//       personalInfo: resumeId.personalInfo,
//     });
