import React, {useEffect, useState} from 'react'
import './Preloader.css'

const Preloader = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        // Функция обработки события прокрутки
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > windowHeight / 2) {
                setShowPreloader(false);
            } else {
                setShowPreloader(true);
            }
        };

        // Добавляем обработчик события прокрутки при монтировании компонента
        window.addEventListener('scroll', handleScroll);

        // Очищаем обработчик события прокрутки при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={`preloader ${showPreloader ? 'show' : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
