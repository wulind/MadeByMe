import "./Patterns.css";
import { useNavigate } from 'react-router-dom';
import {ImageList} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';

const Patterns = () => { 
    const navigate = useNavigate();
    const handleAppendToUrl = (valueToAppend: string) => {
        navigate(`/${valueToAppend}`);
      };

    const srcset = (image: string, size: number, rows = 1, cols = 1) => {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${
            size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const itemData = [
        {
            img: '/images/unraveland.webp',
            cols: 1,
            rows: 4,
            title: 'Unraveland',
            onClick: () => handleAppendToUrl('purchase'),
        },
        {
            img: '/images/dwaynejoe.jpg',
            cols: 1,
            rows: 4,
            title: 'Dwayne Joe',
            onClick: () => handleAppendToUrl('purchase'),
        },
        {
            img: '/images/horizontaleditorial.webp',
            cols: 2,
            rows: 7,
            title: 'Horizontal Editorial',
            onClick: () => handleAppendToUrl('purchase'),
        },
    ];
      
    return (
        <ImageList
            sx={{ width: '100%', height: '100%' }}
            variant="quilted"
            cols={2}
            rowHeight={121}
        >
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                        onClick={item.onClick}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
export default Patterns;