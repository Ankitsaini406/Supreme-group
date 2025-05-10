import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";


export default function ChildLayout({ children }: { children : React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            {children}
            <Footer />
        </div>
    )
}