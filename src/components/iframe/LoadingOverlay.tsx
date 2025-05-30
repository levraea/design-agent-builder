
import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
      <div className="text-sm text-gray-600">Loading preview...</div>
    </div>
  );
};
