import React from 'react';
import { MessageSquareCode } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  // Replace with actual studio phone number
  const phoneNumber = '15552345678'; 
  const message = encodeURIComponent('Hi! I am interested in joining dance classes or booking a free trial at Rock Dance Studio.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.7)] hover:scale-110 transition-all duration-300 group"
        title="Chat with us on WhatsApp"
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 animate-ping group-hover:animate-none pointer-events-none" />
        
        {/* Modern Chat Icon */}
        <MessageSquareCode className="w-6 h-6 animate-pulse" />
      </a>
    </motion.div>
  );
};
