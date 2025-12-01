import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Testimonials from "./Testimonials"



const BaseLayout = () => {

    return (<div className="min-h-screen bg-background">
        <Navbar />
        <Outlet />
        <Testimonials />
        <Footer />
    </div>)
}

export default BaseLayout