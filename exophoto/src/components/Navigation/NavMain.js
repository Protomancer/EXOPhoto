import React from "react";
import {
  Link,
} from "react-router-dom";

 export default function NavBar() {
  return (
    
      <div className="container mx-auto rounded border-2 border-slate-800 py-0.2 mt-1 max-w-md mb-2 bg-sky-600 flex flex-wrap justify-center shadow-md shadow-stone-600">
         <div className="">
           <span className="">
           <nav className="">
           <ol className="primary-nav flex flex flex-wrap gap-6">
             <li className="">
               <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
             </li>
             <li>
               <Link to="/Blog" style={{ textDecoration: 'none' }}>Blog</Link>
             </li>
             <li>
               <Link to="/About" style={{ textDecoration: 'none' }}>About</Link>
             </li>
             <li>
              <Link to="/Login" style={{textDecoration: 'none'}} className="text-red-600 text-black font-semibold">Login/Signup</Link>
             </li>
           </ol>
           </nav>
           </span>
         </div>
       </div>
      
   )
};
