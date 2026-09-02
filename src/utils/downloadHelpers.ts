export const CASKET_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1eVb0EMmnA5vb5UoV9Ltc2gQBWj-rCSGb=s2500';
export const CASKET_DRIVE_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1eVb0EMmnA5vb5UoV9Ltc2gQBWj-rCSGb';

/**
 * Helper to download the Casket Price List official image.
 * Uses blob fetch with a fallback to direct Google Drive download link.
 */
export const downloadCasketImage = async () => {
  try {
    const response = await fetch(CASKET_IMAGE_URL, { mode: 'cors' });
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'middleton-casket-price-list.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }
  } catch (err) {
    console.warn('Cors blob fetch failed, using direct download link:', err);
  }

  // Fallback to direct anchor trigger
  const link = document.createElement('a');
  link.href = CASKET_DRIVE_DOWNLOAD_URL;
  link.target = '_blank';
  link.download = 'middleton-casket-price-list.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
