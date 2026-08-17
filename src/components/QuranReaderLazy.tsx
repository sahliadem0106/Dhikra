import React, { lazy, Suspense } from 'react';
const QuranReaderInner = lazy(() => import('./QuranReader'));

interface Props {
  onModeChange?: (mode: 'list' | 'mushaf') => void;
}

export const QuranReader: React.FC<Props> = (props) => (
  <Suspense fallback={
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-forest" />
    </div>
  }>
    <QuranReaderInner {...props} />
  </Suspense>
);
