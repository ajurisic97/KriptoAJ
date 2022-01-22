// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
 
// export default function Trade({
//     nazivKripto,cijenaKupnje,coins,options,promjeniDohvacenu
// }){
    
//     return(
//         <div className="buyCrypto">
//             <select name="sveOpcije" options={opcije} onChange={promjeniDohvacenu}>
//             {opcije.map((option) => (
//               <option value={option.value} label={option.label}>{option.label}</option>
//             ))}
//             </select>
//             <form onSubmit={handleSubmit}>
//                 <h1>Buy Crypto</h1>
//                 <label id="idCrypto">{nazivKripto}</label><br/>
//                 <label id="idPriceCrypto">{cijenaKupnje}</label>$
//                 <label>
//                     <br/>
//                     Kolicina:
//                     {/* <input
//                     name="kolicina"
//                     type="number"
//                     min={0}
//                     value={kolicina}
//                     onChange={e => setQuantity(e.target.value)}
//                     required /> */}
//                 </label><br/>
//                 <button>Submit</button>
//             </form>
//         </div>
//     )
// }