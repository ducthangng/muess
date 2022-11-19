import * as React from 'react';
import { useGlobalContext } from '../context/global/GlobalContext';

interface ILoadingOverlayProps {
  children: React.ReactNode;
}

const LoadingOverlay: React.FunctionComponent<ILoadingOverlayProps> = ({
  children
}) => {
  const { isLoading } = useGlobalContext();
  return (
    <>
      {isLoading && (
        <div
          className="fixed top-0 right-0 bg-black/50 w-screen h-screen flex justify-center items-center"
          style={{ zIndex: 1000 }}
        >
          <img src="/loading-pacman.svg" alt="loading pacman" />
        </div>
      )}

      {children}
    </>
  );
};

export default LoadingOverlay;
