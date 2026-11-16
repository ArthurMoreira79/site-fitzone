import { useEffect, useState } from 'react';

/** true enquanto a media query bater (ex.: '(prefers-reduced-motion: reduce)'). */
export function useMidia(query) {
  const [bate, setBate] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const mudou = () => setBate(mq.matches);
    mudou();
    mq.addEventListener('change', mudou);
    return () => mq.removeEventListener('change', mudou);
  }, [query]);
  return bate;
}

export const useMovimentoReduzido = () => useMidia('(prefers-reduced-motion: reduce)');
