
  import React, { useState } from 'react';
 import { Link } from 'react-router-dom';
  import { ChevronLeft, ChevronRight } from 'lucide-react';
  import './CardA.css';

  const categories = [
  
    {
      id: 1,
      image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845387806.png' ,
      category: 'Kitchen-Tools'
    },
    {
      id: 2,
      image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845649950.png',
      category: 'Tray',
    },
    {
      id: 3,
      image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845518878.png',
      category: 'Decor',
    },
    {
      id: 4,
      image: 'https://assets.tatacliq.com/medias/sys_master/images/63588845584414.png',
      category: 'Indian-Wear',
    },
    ];

  const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = categories.length;
    const visibleCount = 4;

    const getVisibleItems = () => {
      return Array.from({ length: visibleCount }, (_, i) => {
        const index = (currentIndex + i) % totalItems;
        return categories[index];
      });
    };

    const handlePrev = () => {
     setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + totalItems) % totalItems
      );
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % totalItems
      );
    };

    return (<>
   <div className="carousel__heading">Home-Checklist</div>
     <div className="carousel">
       <div className="carousel__buttons">
         <button onClick={handlePrev} className="carousel__arrow-btn" aria-label="Previous">
           <ChevronLeft size={20} />
         </button>
         <button onClick={handleNext} className="carousel__arrow-btn" aria-label="Next">
           <ChevronRight size={20} />
         </button>
       </div>
       <div className="carousel__grid">
         {getVisibleItems().map((item) => (
           <div key={item.id} className="carousel__card active">
             <Link to={`/category/${item.category}`}>
               <img
                 src={item.image}
                 alt={`${item.category} category`}
                 className="carousel__image"
               />
             </Link>
           </div>
         ))}
       </div>
     </div>
     </>
   );
 };

  export default Carousel;

