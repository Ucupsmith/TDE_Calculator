import Section1 from '@/components/homepage/Section1';
import Section2 from '@/components/homepage/Section2';
import Section3 from '@/components/homepage/Section3';
import Section4 from '@/components/homepage/Section4';
import React from 'react';

const HomePageSection = () => {
  return (
    <div className='flex flex-col gap-10'>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default HomePageSection;
