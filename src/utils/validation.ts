export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  // Check for at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }

  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'Name is required';
  }

  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }

  // Check if name contains only letters, spaces, and hyphens
  if (!/^[a-zA-Z\s-]+$/.test(name)) {
    return 'Name can only contain letters, spaces, and hyphens';
  }

  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone) {
    return 'Phone number is required';
  }

  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length !== 10) {
    return 'Please enter a valid 10-digit phone number';
  }

  return null;
};

export const validateAddress = (address: string): string | null => {
  if (!address) {
    return 'Address is required';
  }

  if (address.length < 5) {
    return 'Please enter a complete address';
  }

  return null;
};

export const validatePostalCode = (postalCode: string): string | null => {
  if (!postalCode) {
    return 'Postal code is required';
  }

  // Basic postal code format validation (can be customized based on country)
  if (!/^\d{5}(-\d{4})?$/.test(postalCode)) {
    return 'Please enter a valid postal code';
  }

  return null;
};

export const validateCity = (city: string): string | null => {
  if (!city) {
    return 'City is required';
  }

  if (city.length < 2) {
    return 'Please enter a valid city name';
  }

  // Check if city contains only letters, spaces, and hyphens
  if (!/^[a-zA-Z\s-]+$/.test(city)) {
    return 'City name can only contain letters, spaces, and hyphens';
  }

  return null;
};

export const validateState = (state: string): string | null => {
  if (!state) {
    return 'State is required';
  }

  if (state.length < 2) {
    return 'Please enter a valid state name';
  }

  return null;
};

export const validateCountry = (country: string): string | null => {
  if (!country) {
    return 'Country is required';
  }

  if (country.length < 2) {
    return 'Please enter a valid country name';
  }

  return null;
};
