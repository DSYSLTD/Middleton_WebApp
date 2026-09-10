import React from 'react';
import VacanciesAdminModule from './VacanciesAdminModule';

interface Props {
  onShowToast?: (msg: string) => void;
}

export default function CmsVacancies({ onShowToast }: Props) {
  return (
    <div className="space-y-6">
      <VacanciesAdminModule />
    </div>
  );
}
