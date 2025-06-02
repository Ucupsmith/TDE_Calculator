import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ExitButton = () => {
    const router = useRouter();

    const handleExit = () => {
        router.push('/article');
    };

    return (
        <button
            onClick={handleExit}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
        >
            <Image
                src="/exit.svg"
                alt="Exit"
                width={24}
                height={24}
            />
        </button>
    );
};

export default ExitButton; 