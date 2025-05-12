
export default function ContactUs() {
    return (
        <div className="bg-accent py-20 px-5 text-background">
            <div className="max-w-[1020px] w-full mx-auto">
                <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">

                    {/* Address */}
                    <div>
                        <h3 className="text-2xl lg:text-[28px] 2xl:text-4xl md:leading-snug lg:leading-snug 2xl:leading-snug font-semibold">Get in touch</h3>
                        <div className="h-[3px] bg-background w-12 my-4 md:my-5 lg:my-6 2xl:my-8"></div>

                        <p className="font-normal text-base md:text-lg 2xl:text-2xl">For general enquiries</p>

                        <div className="flex flex-col items-start gap-3 md:gap-5 2xl:gap-7 pt-5 md:pt-7 2xl:pt-8">
                            <div>
                                <h5 className="font-medium text-lg md:text-lg xl:text-xl">Address :</h5>
                                <h6 className="font-normal opacity-90 text-sm md:text-base 2xl:text-xl">110, 16th Road, Chembur, Mumbai - 400071</h6>
                            </div>

                            <div>
                                <h5 className="font-medium text-lg md:text-lg xl:text-xl">Phone :</h5>
                                <h6 className="font-normal opacity-90 text-sm md:text-base 2xl:text-xl">+91 22 25208822</h6>
                            </div>

                            <div>
                                <h5 className="font-medium text-lg md:text-lg xl:text-xl">Email :</h5>
                                <h6 className="font-normal opacity-90 text-sm md:text-base 2xl:text-xl">info@supremegroup.co.in</h6>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mx-auto w-full flex flex-col items-start 2xl:gap-9 gap-4">
                        <input
                            className="bg-accent text-background placeholder:opacity-90 transition-all duration-200 tracking-wide ease-in-out border-b-2 border-background/40 focus:border-background focus:outline-none focus:ring-0 focus-visible:outline-none w-full py-2 pr-2 text-base lg:text-lg placeholder:text-background font-normal"
                            placeholder="Full Name"
                            name="name"
                        />

                        <input
                            className="bg-accent text-background placeholder:opacity-90 transition-all duration-200 tracking-wide ease-in-out border-b-2 border-background/40 focus:border-background focus:outline-none focus:ring-0 focus-visible:outline-none w-full py-2 pr-2 text-base lg:text-lg placeholder:text-background font-normal"
                            placeholder="E-mail"
                            name="email"
                        />

                        <input
                            className="bg-accent text-background placeholder:opacity-90 transition-all duration-200 tracking-wide ease-in-out border-b-2 border-background/40 focus:border-background focus:outline-none focus:ring-0 focus-visible:outline-none w-full py-2 pr-2 text-base lg:text-lg placeholder:text-background font-normal"
                            placeholder="Subject"
                            name="subject"
                        />

                        <input
                            className="bg-accent text-background placeholder:opacity-90 transition-all duration-200 tracking-wide ease-in-out border-b-2 border-background/40 focus:border-background focus:outline-none focus:ring-0 focus-visible:outline-none w-full py-2 pr-2 text-base lg:text-lg placeholder:text-background font-normal"
                            placeholder="Message"
                            name="message"
                        />

                        <button type="submit" className="bg-background text-foreground py-2 px-10 rounded-4xl border border-accent hover:bg-accent hover:border-background hover:text-background duration-500 cursor-pointer">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}