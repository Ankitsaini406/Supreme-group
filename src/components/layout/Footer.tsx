import Image from "next/image";
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="bg-foreground text-background p-4 md:p-12">
            <div className="container mx-auto">
                <div className="relative h-12 w-[150px] cursor-pointer">
                    <Image src='/logo.svg' alt="Commpeny Logo" fill loading='lazy' />
                </div>

                <div className="grid grid-cols-2 md:flex md:flex-row flex-col items-start justify-between md:pr-10 lg:gap-20 sm:gap-10 gap-4 2xl:mt-10 mt-8">
                    <ul className="grid sm:gap-5 gap-3 text-black list-none">
                        <li className="md-2 font-semibold uppercase opacity-90">Applications</li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Apparel</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Automotive</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Filtration</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Customised Solutions</Link></li>
                    </ul>

                    <ul className="grid sm:gap-5 gap-3 text-black list-none">
                        <li className="md-2 font-semibold uppercase opacity-90">Company</li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Innovation</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Global Competency</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">About Us</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Contact Us</Link></li>
                    </ul>

                    <ul className="grid sm:gap-5 gap-3 text-black list-none">
                        <li className="md-2 font-semibold uppercase opacity-90">More</li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Careers</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Privacy Policy</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Terms and Conditions</Link></li>
                    </ul>

                    <ul className="grid sm:gap-5 gap-3 text-black list-none">
                        <li className="md-2 font-semibold uppercase opacity-90">Follow Us</li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Twitter</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Linkedin</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Instagram</Link></li>
                        <li><Link href='/' className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Medium</Link></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-6 md:flex-row justify-between mt-12">
                    <span className="xl:text-base text-sm text-black block whitespace-nowrap opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">
                        ©{new Date().getFullYear()}. All Rights Reserved.
                    </span>
                    <span className="xl:text-base text-sm text-black block opacity-70 hover:opacity-100 focus:outline-none decoration-from-font underline-offset-4 focus:opacity-100">Supreme house: 100, 16th Road, Chembur, Mumbai - 400071.</span>
                </div>
            </div>
        </footer>
    )
}