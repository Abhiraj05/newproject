import {Scale, Menu} from "lucide-react";
import GrayButton from "./buttons/GrayButton";

const Navbar=()=>{
    return(
        <>
            <header className='sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-slate-950/80'>
            <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
              <div className='flex items-center gap-3 font-semibold text-xl'><Scale className='w-6 h-6 text-amber-400'/>Legal Next</div>
              <nav className='hidden md:flex gap-8 text-sm text-slate-300'>
                <a href='#'>Home</a><a href='#'>Solutions</a><a href='#'>Pricing</a><a href='#'>About</a>
              </nav>
              <div className='hidden md:block'><a href="/signin"><GrayButton className='rounded-2xl' title={"Log in"}></GrayButton></a></div>
              <Menu className='md:hidden'/>
            </div>
          </header>
        </>
    )
}
export default Navbar;