import { linkContato } from '../utils/whatsapp.js';
import { IconeWhatsApp } from './Icones.jsx';
import './WhatsAppButton.css';

// Coral com ícone Jet Black: o verde do WhatsApp lembraria a anilha da Yoga.
export default function WhatsAppButton() {
  return (
    <a
      className="whats-flutuante"
      href={linkContato()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <IconeWhatsApp />
    </a>
  );
}
