import React, { useEffect, useState } from 'react';
import classes from './corousel.module.css';
import { Carouseldata } from '../../dummyData';

var activeIndex = 0;
const Carousel = () => {

    const [activeData, setActiveData] = useState();

    useEffect(()=>{
        if(Carouseldata){
            setActiveData(Carouseldata[activeIndex]);
        }
    },[]);


    const handleCarousel = (type)=>{
        
        if(type === "prev"){
            activeIndex = activeIndex -1;
            setActiveData(Carouseldata[activeIndex]);
        }

        if(type === "next"){
            activeIndex = activeIndex + 1;
            setActiveData(Carouseldata[activeIndex]);
        }
    }
   
    return (
        <section className={classes.my_corousel_container}>
            <ul className={classes.my_corousel_items}>
                <li className={classes.my_corousel_item}>
                    <div className={classes.btn_Carousel}>
                        <button onClick={()=>handleCarousel("prev")} disabled={activeIndex <= 0?true:false}>&#10094; Previous</button>
                        <button onClick={()=>handleCarousel("next")} disabled={activeIndex >= Carouseldata.length -1?true:false}>Next &#10095;</button>
                    </div>
                    <section className={classes.my_carousel_here}>
                        <div className={classes.carousel_left}>
                            <div className={classes.carousel_header}>
                                {activeData?.title && activeData.title}
                            </div>
                            <div className={classes.carousel_desc}>
                                {activeData?.description && activeData.description}
                            </div>
                        </div>
                        <div className={classes.carousel_right}>
                            <img src={activeData?.url && activeData.url} alt="" />
                        </div>
                    </section>
                </li>
            </ul>
        </section>
    )
}

export default Carousel