import { useEffect, useState } from 'react';

export default function useOrientation() {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isLandscape;
}
