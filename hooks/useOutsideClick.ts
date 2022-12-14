import { useCallback, useEffect, useRef } from 'react';

const useOutsideClick = (onClickRight: () => void) => {
  const ref = useRef(null);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (ref.current === null) return;
      if (!(ref.current! as any).contains(e.target)) {
        onClickRight?.();
      }
    },
    [onClickRight],
  );
  useEffect(() => {
    document.addEventListener('mousedown', clickListener);

    return () => {
      document.removeEventListener('mousedown', clickListener);
    };
  });
  return ref;
};

export default useOutsideClick;
