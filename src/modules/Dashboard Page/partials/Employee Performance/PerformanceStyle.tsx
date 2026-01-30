export const getPerformanceStyle = (performance: string): string => {
  switch (performance) {
    case 'Excellent':
      return 'text-sky-600 bg-sky-100';
    case 'Good':
      return 'text-green-600 bg-green-100';
    case 'Average':
      return 'text-yellow-600 bg-yellow-100';
    case 'Weak':
      return 'text-red-600 bg-red-100';
    default:
      return '';
  }
};
