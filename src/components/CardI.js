

// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import './CardA.css'; // Updated CSS filename

// const items = [
//   { id: 1, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846895134.png' },
//   { id: 2, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588846960670.png' },
//   { id: 3, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588847026206.png' },
//   { id: 4, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588847157278.png' },
//   { id: 5, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588847222814.png' },
//   { id: 6, image: 'https://assets.tatacliq.com/medias/sys_master/images/63588847288350.png' },
  
// ];

// const Carousel = () => {
//   const [startIndex, setStartIndex] = useState(0);

//   const getVisibleItems = () => {
//     return Array.from({ length: 4 }, (_, i) => items[(startIndex + i) % items.length]);
//   };

//   const next = () => {
//     setStartIndex((prev) => (prev + 1) % items.length);
//   };

//   const prev = () => {
//     setStartIndex((prev) => (prev - 1 + items.length) % items.length);
//   };

//   const visibleItems = getVisibleItems();

//   return (
//     <>
//       <div className="carousel__heading">Fully Framed</div>
//       <div className="carousel">
//         <div className="carousel__grid">
//           {visibleItems.map((item) => (
//             <div key={item.id} className="carousel__card">
//               {item.image ? (
//                 <img
//                   src={item.image}
//                   alt={`Item ${item.id}`}
//                   className="carousel__image"
//                 />
//               ) : (
//                 <div className="carousel__placeholder">No Image</div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="carousel__buttons">
//           <button onClick={prev} className="carousel__arrow-btn" aria-label="Previous">
//             <ChevronLeft size={20} />
//           </button>
//           <button onClick={next} className="carousel__arrow-btn" aria-label="Next">
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Carousel;
