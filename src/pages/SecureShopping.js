

 import React from 'react';

 const SecureShopping = () => {
   return (
    <div
       style={{
         border: '2px solid #ccc',
         padding: '16px',
         borderRadius: '8px',
         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
         maxWidth: '1000px',
         margin: '30px auto',
         backgroundColor: 'white',
         paddingBottom:'100px',
         
       }}
     >
       <div style={{ padding: '40px', textAlign: 'center' }}>
         <img
           src="https://img.freepik.com/premium-vector/pink-shield-with-large-lock-middle-that-says-security-it_42077-16283.jpg"
           alt="Security Shield"
           width="200"
           style={{ maxWidth: '100%', height: 'auto' }}
         />
         <h1>BEWARE OF FRAUDULENT CALLS, OFFERS AND PAYMENTS.</h1>
         <ul style={{ maxWidth: '700px', margin: 'auto', textAlign: 'left' }}>
           <li>
             At Tata Cliq, our top priority is to provide our valued customers with a safe and enjoyable shopping
             experience. We are committed to building 'Digital Trust' to ensure your online security.
           </li>
           <li>
             Please be aware that any special offers or discounts will only be available on Tata CliQ's official
             channels. We never make telemarketing calls or encourage payments outside of our trusted app or website.
           </li>
           <li>
             Although spam filters may block many phishing emails from reaching your inbox, it's important to take extra
             precautions to protect yourself.
           </li>
           <li>Do not share OTPs with anyone.</li>
         </ul>
         <div style={{ marginTop: '40px', textAlign: 'center' }}>
           <h2 style={{ color: '#b30059' }}>
             Here are a few simple steps you can take to guard against online scams:
           </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
            <div style={boxStyle}>
             <span role="img" aria-label="ticket">🎟️</span>{' '}
               Always make your transactions through the official Tata CLiQ  website and/or App.             </div>
             <div style={boxStyle}>
               <span role="img" aria-label="link">🔗</span>{' '}
               Avoid clicking on links sent by unknown sources, as some may redirect you to a payment app and deduct
               funds without your consent.
             </div>
             <div style={boxStyle}>
               <span role="img" aria-label="shield">🛡️</span>{' '}
               Stick to reliable e-commerce platforms to avoid the risks associated with fraudulent websites and keep
               your personal information safe.
             </div>
           </div>

           <p style={{ marginTop: '30px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
             If you receive any suspicious calls or come across questionable offers, please report them to us immediately.
             We will take swift action to curb fraudulent activities.
           </p>
           <p style={{ maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
             We value your trust in us and are thoroughly committed to ensuring your safety during your shopping journey             on Tata CLiQ.
           </p>
           <p style={{ color: '#b30059', fontWeight: 'bold', marginTop: '20px' }}>
             Thank you for being a part of the Tata CLiQ family.
           </p>
         </div>
       </div>
     </div>
   );
 };

 const boxStyle = {
   border: '3px solid #ccc',
   padding: '16px',
   borderRadius: '50px',
   backgroundColor: '#f9f9f9',
   maxWidth: '700px',
   margin: '0 auto',
   textAlign: 'left',
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   fontSize: '16px'
 };

 export default SecureShopping;























