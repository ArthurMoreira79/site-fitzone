/**
 * Monta a URL de um arquivo da pasta public/ respeitando o "base" do Vite,
 * para funcionar tanto na raiz (Vercel) quanto em subpasta.
 */
export const asset = (caminho) => import.meta.env.BASE_URL + caminho.replace(/^\//, '');

/** srcset das fotos geradas por scripts/otimizar-midias.mjs (dois tamanhos por foto). */
export function fotoPaisagem(nome) {
  return {
    src: asset(`img/${nome}-1376.webp`),
    srcSet: `${asset(`img/${nome}-800.webp`)} 800w, ${asset(`img/${nome}-1376.webp`)} 1376w`,
    width: 1376,
    height: 768,
  };
}

export function fotoRetrato(nome) {
  return {
    src: asset(`img/${nome}-896.webp`),
    srcSet: `${asset(`img/${nome}-480.webp`)} 480w, ${asset(`img/${nome}-896.webp`)} 896w`,
    width: 896,
    height: 1200,
  };
}
