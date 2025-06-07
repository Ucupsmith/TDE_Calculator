import React from 'react';
import { motion } from 'framer-motion';

interface ArticleProps {
  title: string;
  content: React.ReactNode;
  imageSrc: string;
  showBmiTable?: boolean;
  // Add other props like showAktivitasTable if needed
}

const Article: React.FC<ArticleProps> = ({
  title,
  content,
  imageSrc,
  showBmiTable,
}) => {
  return (
    <motion.div 
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h1>
      
      <motion.img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-64 object-cover mb-6 rounded"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {content}
      </motion.div>
      
      {showBmiTable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* <BmiTable /> */}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Article; 