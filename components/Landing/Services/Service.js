import services from './Services.module.css';
import Image from 'next/image';
export default function Service({image, name}){
    return (
        <>
            <div className={services.service}>
                <img src={image} alt='NA' className={services.image}/>
                <div className={services.name}>{name}</div>
            </div> 
        </>
    );
}