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
  var urlRegex = /^(https):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}
