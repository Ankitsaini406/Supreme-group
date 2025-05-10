'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 10) {
                setHideHeader(true);
            } else {
                setHideHeader(false);
            }

            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    return (
        <AnimatePresence>
            {!hideHeader && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full bg-foreground text-background p-5 shadow-md z-50"
                >
                    <header className="flex justify-between items-center container mx-auto">
                        <div className='relative h-12 w-[150px]'>
                            <Link href='/'>
                            <Image src='/logo.svg' alt='Logo' fill loading='eager' className='h-full cursor-pointer' />
                            </Link>
                        </div>
                        <nav className="space-x-4">
                            <a href="#" className="hover:underline">Home</a>
                            <a href="#" className="hover:underline">About</a>
                            <a href="#" className="hover:underline">Contact</a>
                        </nav>
                    </header>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
