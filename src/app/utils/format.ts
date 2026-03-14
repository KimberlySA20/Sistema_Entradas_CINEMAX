// Utilidades de formato para precios y moneda

// Formato de colones costarricenses
export const formatColones = (amount: number): string => {
  return `₡${amount.toLocaleString('es-CR', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  })}`;
};

// Formato de dólares (para compatibilidad)
export const formatDollars = (amount: number): string => {
  return `$${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  })}`;
};

// Formato principal (usar colones)
export const formatPrice = formatColones;
