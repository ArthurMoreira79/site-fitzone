// Converte as fotos de ../imagens/fotos para WebP em public/img (dois tamanhos para o srcset)
// e copia os vídeos (já sem áudio) e a logo. Rode com: npm run midias
import sharp from 'sharp';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, '..', 'imagens');
const destino = join(raiz, 'public');

// arquivo de origem -> nome no site
const PAISAGEM = {
  '3a.jpg': 'musculacao-salao',
  '3b.jpg': 'musculacao-barra',
  '3c.jpg': 'musculacao-privada',
  '4a.jpg': 'yoga',
  '5a.jpg': 'crossfit',
  '6a.jpg': 'piscina',
  '9a.jpg': 'fachada',
  '9b.jpg': 'recepcao',
  '9c.jpg': 'cardio',
  '9d.jpg': 'vestiario',
};
const RETRATO = {
  'personal_musc_marcos.jpg': 'professor-marcos',
  'personal_yoga_erica.jpg': 'professora-erica',
  'personal_crossfit_julia.jpg': 'professora-julia',
  'personal_natação_andre.jpg': 'professor-andre',
};
const VIDEOS = { 'hero.mp4': 'hero.mp4', 'mulher-treinando.mp4': 'mulher-treinando.mp4' };

const kb = (f) => `${Math.round(statSync(f).size / 1024)} KB`;

async function webp(arquivo, nome, larguras, pasta) {
  mkdirSync(join(destino, pasta), { recursive: true });
  for (const w of larguras) {
    const saida = join(destino, pasta, `${nome}-${w}.webp`);
    await sharp(join(origem, 'fotos', arquivo))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(saida);
    console.log(`${pasta}/${nome}-${w}.webp`.padEnd(42), kb(saida));
  }
}

for (const [arq, nome] of Object.entries(PAISAGEM)) await webp(arq, nome, [800, 1376], 'img');
for (const [arq, nome] of Object.entries(RETRATO)) await webp(arq, nome, [480, 896], 'img');

mkdirSync(join(destino, 'video'), { recursive: true });
for (const [arq, nome] of Object.entries(VIDEOS)) {
  const saida = join(destino, 'video', nome);
  copyFileSync(join(origem, 'fotos', arq), saida);
  console.log(`video/${nome}`.padEnd(42), kb(saida));
}

mkdirSync(join(destino, 'img', 'logo'), { recursive: true });
for (const arq of readdirSync(join(origem, 'logo')).filter((f) => f.endsWith('.svg'))) {
  copyFileSync(join(origem, 'logo', arq), join(destino, 'img', 'logo', arq));
  console.log(`img/logo/${arq}`);
}
