import type { Transaction } from '../types';

export const validateTransaction = (data: Partial<Transaction>) => {
  const errors: Record<string, string> = {};

  
  if (!data.description || data.description.trim().length < 3) {
    errors.description = "Description must be at least 3 characters.";
  }

  
  if (!data.amount || isNaN(data.amount) || data.amount <= 0) {
    errors.amount = "Amount must be a positive number.";
  }

  
  if (!data.date) {
    errors.date = "Please select a valid date.";
  }

  
  if (!data.categoryId) {
    errors.categoryId = "Please select a category.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
