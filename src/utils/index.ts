export const getFirstCampLetter = (word: string) =>
  word.substring(0, 1).toUpperCase();

export function formatNumberWithCommas(number: number) {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
}

export function fuzzyMatch(query: string, text: string) {
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedQuery, 'i');
  return regex.test(text);
}

export function maskAddress(address: string) {
  return (
    address.substring(0, 10) +
    '...' +
    address.substring(address.length - 10, address.length)
  );
}
export function maskAddress4(address: string) {
  return (
    address.substring(0, 4) +
    '...' +
    address.substring(address.length - 4, address.length)
  );
}

export function isValidURL(url: string) {
  const urlRegex = /^(https):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}

export function formatCurrency(num: number, symbol = true) {
  if (isNaN(num)) {
    return 'Invalid number';
  }
  if (!symbol) {
    return num.toLocaleString();
  }

  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function formatLargeNumber(value: number): string {
  const units = ['', 'K', 'M', 'B'];
  const tier = value < 1000 ? 0 : Math.floor(Math.log10(value) / 3);
  const scaled = value / Math.pow(1000, tier);

  return scaled.toFixed(1) + units[tier];
}
