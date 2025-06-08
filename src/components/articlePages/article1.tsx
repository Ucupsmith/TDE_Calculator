import React from 'react';
import Article from '@/components/ArticleComponent/Article';
import PaginationControls from '../pagination-controls/PaginationControls';

const Article1 = () => {
  const content = (
    <>
      <h3 className='text-lg leading-relaxed'>
        <span className='font-bold'>TDEE </span>
        <span className='italic'>(Total Daily Energy Expenditure)</span> adalah
        jumlah total kalori yang dibakar oleh tubuh dalam satu hari. Ini
        mencakup seluruh aktivitas tubuh, mulai dari metabolisme basal
        (BMR)—yakni energi yang dibutuhkan untuk fungsi vital seperti bernapas
        dan detak jantung saat istirahat—hingga pencernaan makanan, serta
        aktivitas fisik seperti berjalan, bekerja, dan berolahraga.
      </h3>

      <div className='mt-8 space-y-6'>
        <section>
          <h2 className='font-bold text-xl mb-4'>Komponen TDEE</h2>
          <ul className='list-disc pl-6 space-y-3'>
            <li>
              <span className='font-semibold'>BMR (Basal Metabolic Rate):</span>{' '}
              Kalori yang dibakar saat tubuh dalam keadaan istirahat total
            </li>
            <li>
              <span className='font-semibold'>
                TEF (Thermic Effect of Food):
              </span>{' '}
              Energi yang digunakan untuk mencerna dan memproses makanan
            </li>
            <li>
              <span className='font-semibold'>
                EAT (Exercise Activity Thermogenesis):
              </span>{' '}
              Kalori yang dibakar saat berolahraga
            </li>
            <li>
              <span className='font-semibold'>
                NEAT (Non-Exercise Activity Thermogenesis):
              </span>{' '}
              Kalori yang dibakar dari aktivitas sehari-hari selain olahraga
            </li>
          </ul>
        </section>

        <section>
          <h2 className='font-bold text-xl mb-4'>Mengapa TDEE Penting?</h2>
          <p className='text-gray-700'>
            Mengetahui TDEE Anda sangat penting untuk:
          </p>
          <ul className='list-disc pl-6 mt-3 space-y-2'>
            <li>Menurunkan berat badan dengan aman</li>
            <li>Menambah massa otot</li>
            <li>Mempertahankan berat badan ideal</li>
            <li>Merencanakan pola makan yang sehat</li>
          </ul>
        </section>
      </div>
    </>
  );

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Article
        title='Memahami TDEE: Kunci Mengelola Kebutuhan Kalori Harian Anda'
        content={content}
        imageSrc='/tdee1.png'
        showBmiTable={false}
      />
    </div>
  );
};

export default Article1;
