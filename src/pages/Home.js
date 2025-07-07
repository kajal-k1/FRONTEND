
import React from 'react'
 
 import Carousel from '../components/Carousel';
 import  CardA from '../components/CardA'; 
 import Cards from '../components/Cards';
 import CardB from '../components/CardB';
 import CardC from '../components/CardC'
 import CardD from '../components/CardD';
 import CardF from  '../components/CardF';
 //import CardG from '../components/CardG';
 import CardH from '../components/CardH';
 //import CardI from '../components/CardI';
 import CardJ from '../components/CardJ';
import ShopSafeCard from '../components/ShopSafeCard';

 function Home() {
   return (
     <div className='Home'>

          
       <Carousel/>
       <Cards/>
       <CardA/>
       <CardB/>
       <CardC/>
       <CardD/>
       <CardF/>
       <CardH/>
       <CardJ/>
       <ShopSafeCard/>
 
     </div>
   )
 }
 export default Home








