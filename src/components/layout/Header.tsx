'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn } from "react-icons/fa6";
import { BsTranslate } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Header() {
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (menuOpen) return;

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
    }, [lastScrollTop, menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <AnimatePresence>
            {!hideHeader && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full bg-background text-foreground p-3 shadow-md z-50"
                >
                    <header className="flex justify-between items-center container mx-auto relative">
                        <div className='relative h-12 w-[150px]'>
                            <Link href='/'>
                                <Image src='/logo.svg' alt='Logo' fill loading='eager' className='h-full cursor-pointer' />
                            </Link>
                        </div>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href='#'>
                                <button className='bg-[#5CD6FF] border border-[#02b8f4] text-foreground px-4 py-2 rounded-4xl cursor-pointer hover:bg-background hover:text-foreground duration-300'>Contact Us</button>
                            </Link>
                            <Link href="#"><FaLinkedinIn /></Link>
                            <Link href="#" className="flex gap-2"><BsTranslate /> <span className='text-[12px]'>ENG</span></Link>
                        </nav>

                        {/* Mobile Menu */}
                        <div className="md:hidden z-50">
                            <button onClick={toggleMenu}>
                                {menuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
                            </button>
                        </div>

                        <AnimatePresence>
                            {menuOpen && (
                                <>
                                    <motion.div
                                        className="fixed inset-0 bg-foreground/90 z-30 md:hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={toggleMenu}
                                    />

                                    <motion.nav
                                        initial={{ x: '100%' }}
                                        animate={{ x: 0 }}
                                        exit={{ x: '100%' }}
                                        transition={{ duration: 0.3 }}
                                        className="fixed top-0 right-0 h-screen w-80 bg-background text-foreground px-6 pt-20 flex flex-col items-center gap-6 md:hidden z-40"
                                    >
                                        <Link href='#' onClick={toggleMenu}>
                                            <button className='bg-[#5CD6FF] border border-[#5CD6FF] text-background px-4 py-2 rounded-4xl w-full hover:bg-foreground duration-300'>
                                                Contact Us
                                            </button>
                                        </Link>
                                        <Link href="#" onClick={toggleMenu}><FaLinkedinIn /></Link>
                                        <Link href="#" className="flex gap-2"><BsTranslate /> <span className='text-[12px]'>ENG</span></Link>
                                    </motion.nav>
                                </>
                            )}
                        </AnimatePresence>
                    </header>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
