// Utility function to convert Google Drive file ID to reliable direct image URL
export const getDriveImageUrl = (fileId: string): string => {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
};

// Image Constants provided by user
export const DRIVE_IMAGES = {
  // Homepage Hero Slider
  HOME_HERO_SLIDE_1: getDriveImageUrl('1fmSgCm4uP5XmznXjD62PhrOhqqd3OWMN'),
  HOME_HERO_SLIDE_2: getDriveImageUrl('1DMlJK6-f3j2thiSv2gQ1DB0VU8du2ven'),
  HOME_HERO_SLIDE_3: getDriveImageUrl('1MEB4GmUlDJ4CM37VG4SQ5uxZaTLk96PS'),

  // Middleton Funeral Care page
  MIDDLETON_FUNERAL_CARE: getDriveImageUrl('1s7nycPGHfUToC_ypR_25NXgiXtkMG6lX'),

  // Burial Options - Our Philosophy section
  BURIAL_PHILOSOPHY: getDriveImageUrl('1Sf86HOIHMWGyKCIg-RT_GfhPEx4416MY'),

  // Cremation Options page
  CREMATION_1: getDriveImageUrl('1BH3EuqH245H1dpMXIMm6oFQO6pTu7kbH'),
  CREMATION_2: getDriveImageUrl('1dOIflrP8rdgfDU3LwRGPwpaVnAhHpyVL'),
  CREMATION_MEMORIALIZATION: getDriveImageUrl('1iiDG8jfXPdhtZwKm4yDh8OhzK01sc4te'),

  // Grief & Bereavement Support - Peer Support Circles section
  GRIEF_PEER_SUPPORT: getDriveImageUrl('15FVIqaMW_H6nUojupiyl_VsKVZKiNv2j'),
  GRIEF_EDUCATION: getDriveImageUrl('15JLYes7eMrZxmvLYYFnfOK_a1LeOerqU'),

  // How We Work - Excellence In Care section
  EXCELLENCE_IN_CARE: getDriveImageUrl('1bWPGWKFTqVayUtR9YKtjBmNyqq0F0JfD'),

  // Graceful Procession page
  GRACEFUL_PROCESSION_1: getDriveImageUrl('1KtuNKHkjFbc5WrBjmywn5M5SK3hrZTxy'),
  GRACEFUL_PROCESSION_2: getDriveImageUrl('1W5Ay6Hq_pAW7Ccv5VqbznQqR-DxxFkom'),
  GRACEFUL_PROCESSION_3: getDriveImageUrl('1bcdfjoeuI2dmfThAsYHGEpOjPE_-bV_F'),

  // Pre-Planning section on Homepage
  HOME_PRE_PLANNING: getDriveImageUrl('1nGk_uqBLAiriTUI07bfW2aCX_ZcGnop0'),

  // About Us - Backbone section
  MWANSA_1: getDriveImageUrl('1XTZ9yKjI_XyLIzETkTx3pkg2uhfYM-aD'),
  MWANSA_2: getDriveImageUrl('1J_oDMET-k5eOAwAz5y0KgCd-pda_LPc2'),
  ELSIE_1: getDriveImageUrl('1O2WYsLsabwIPOPcQI5-dFliPaugfzRjs'),
  ELSIE_2: getDriveImageUrl('17WdIhnXdvYYCwlPRvzcR36tMCwo-nRQR'),

  // Obituaries - Common Queries section & FAQ page
  FAQ_AND_QUERIES: getDriveImageUrl('1ufVh0G1DwGzfHrTrwmpKvDjV0-HrBTHU'),

  // Strategic placements for non-hero sections across pages
  STRATEGIC_1: getDriveImageUrl('16WPLBeKGAMFWN9BPBWX5jezy6kOEYy95'),
  STRATEGIC_2: getDriveImageUrl('1kdT6qPHT6h7SqH_BFYNnTT6gf3RHCD_F'),
  STRATEGIC_3: getDriveImageUrl('1pXGza3nwiO5nIKDGkfc4BABj29sOlUK_'),
  STRATEGIC_4: getDriveImageUrl('1Kb1kw7rTep6unhpMAVHg2Ly2lxXJkEw3'),
  STRATEGIC_5: getDriveImageUrl('1zR2oYE1OXsfErSHhdEyKjPjOpaW7dvlt'),
};

