// Validation utility functions for form inputs

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return {
    isValid,
    error: isValid ? null : 'Please enter a valid email address'
  };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {{isValid: boolean, error: string|null, strength?: string}}
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required'
    };
  }

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasSpace = /\s/.test(password);
  const isValid = hasMinLength && hasNumber && hasUppercase;

  // Calculate strength
  let strength = 'weak';
  if (hasMinLength && hasNumber && hasUppercase && hasLowercase) {
    strength = 'medium';
  }
  if (hasMinLength && hasNumber && hasUppercase && hasLowercase && hasSpecial) {
    strength = 'strong';
  }
  if (hasMinLength && hasNumber && hasUppercase && hasLowercase && hasSpecial && hasSpace) {
    strength = ' very strong';
  }

  return {
    isValid,
    error: isValid ? null : 'Password must be at least 8 characters with one number and one uppercase letter',
    strength
  };
};

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @param {number} minLength - Minimum length (default 2)
 * @param {number} maxLength - Maximum length (default 100)
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateName = (name, minLength = 2, maxLength = 100) => {
  if (!name || !name.trim()) {
    return {
      isValid: false,
      error: 'Name is required'
    };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < minLength) {
    return {
      isValid: false,
      error: `Name must be at least ${minLength} characters`
    };
  }

  if (trimmedName.length > maxLength) {
    return {
      isValid: false,
      error: `Name must be less than ${maxLength} characters`
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @param {boolean} required - Whether URL is required
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateURL = (url, required = false) => {
  if (!url || !url.trim()) {
    if (required) {
      return {
        isValid: false,
        error: 'URL is required'
      };
    }
    return {
      isValid: true,
      error: null
    };
  }

  // Simple URL validation - allows domain.com format or https://domain.com
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  const isValid = urlRegex.test(url);

  return {
    isValid,
    error: isValid ? null : 'Please enter a valid URL'
  };
};

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone number to validate
 * @param {boolean} required - Whether phone is required
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validatePhone = (phone, required = false) => {
  if (!phone || !phone.trim()) {
    if (required) {
      return {
        isValid: false,
        error: 'Phone number is required'
      };
    }
    return {
      isValid: true,
      error: null
    };
  }

  // Basic phone validation - allows various formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const isValid = phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;

  return {
    isValid,
    error: isValid ? null : 'Please enter a valid phone number'
  };
};

/**
 * Validate date range
 * @param {string} startDate - Start date in YYYY-MM format
 * @param {string} endDate - End date in YYYY-MM format or "present"
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateDateRange = (startDate, endDate) => {
  if (!startDate) {
    return {
      isValid: false,
      error: 'Start date is required'
    };
  }

  if (!endDate) {
    return {
      isValid: false,
      error: 'End date is required'
    };
  }

  // If end date is "present", it's valid
  if (endDate === 'present') {
    return {
      isValid: true,
      error: null
    };
  }

  // Validate date format YYYY-MM
  const dateRegex = /^\d{4}-\d{2}$/;
  if (!dateRegex.test(startDate)) {
    return {
      isValid: false,
      error: 'Start date must be in YYYY-MM format'
    };
  }
  if (!dateRegex.test(endDate)) {
    return {
      isValid: false,
      error: 'End date must be in YYYY-MM format'
    };
  }

  // Parse dates for comparison
  const start = new Date(startDate + '-01');
  const end = new Date(endDate + '-01');

  if (end < start) {
    return {
      isValid: false,
      error: 'End date must be after start date'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validate date format (YYYY-MM)
 * @param {string} date - Date to validate
 * @param {boolean} required - Whether date is required
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateDate = (date, required = true) => {
  if (!date || !date.trim()) {
    if (required) {
      return {
        isValid: false,
        error: 'Date is required'
      };
    }
    return {
      isValid: true,
      error: null
    };
  }

  const dateRegex = /^\d{4}-\d{2}$/;
  const isValid = dateRegex.test(date);

  if (!isValid) {
    return {
      isValid: false,
      error: 'Date must be in YYYY-MM format'
    };
  }

  // Validate the date is not in the future (beyond next month)
  const inputDate = new Date(date + '-01');
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);

  if (inputDate > nextMonth) {
    return {
      isValid: false,
      error: 'Date cannot be more than one month in the future'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validate text length
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @param {boolean} required - Whether text is required
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateTextLength = (text, minLength, maxLength, required = false) => {
  if (!text || !text.trim()) {
    if (required) {
      return {
        isValid: false,
        error: 'This field is required'
      };
    }
    return {
      isValid: true,
      error: null
    };
  }

  const length = text.trim().length;

  if (length < minLength) {
    return {
      isValid: false,
      error: `Must be at least ${minLength} characters`
    };
  }

  if (length > maxLength) {
    return {
      isValid: false,
      error: `Must be less than ${maxLength} characters`
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validate GPA
 * @param {string} gpa - GPA to validate
 * @param {boolean} required - Whether GPA is required
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateGPA = (gpa, required = false) => {
  if (!gpa || !gpa.trim()) {
    if (required) {
      return {
        isValid: false,
        error: 'GPA is required'
      };
    }
    return {
      isValid: true,
      error: null
    };
  }

  const gpaNum = parseFloat(gpa);

  if (isNaN(gpaNum)) {
    return {
      isValid: false,
      error: 'GPA must be a number'
    };
  }

  if (gpaNum < 0 || gpaNum > 10.0) {
    return {
      isValid: false,
      error: 'GPA must be between 0.0 and 10.0'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateRequired = (value, fieldName = 'This field') => {
  const isEmpty = value === null ||
                  value === undefined ||
                  (typeof value === 'string' && !value.trim()) ||
                  (Array.isArray(value) && value.length === 0);

  return {
    isValid: !isEmpty,
    error: isEmpty ? `${fieldName} is required` : null
  };
};