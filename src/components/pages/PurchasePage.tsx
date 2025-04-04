import Header from "../FixedNav/Header";
import Box from '@mui/material/Box';
import "./PurchasePage.css";

const PurchasePage = () => {
  return (
    <div className="productPage">
        <Header isSticky={true}/>
            <div className="productImage">
                <img  src="/images/unraveland.webp"/>
            </div>
            <div className="colorWayViewer">
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: "5em",
                        width: "25em",
                    }}
                >
                    <div className="colorTile" style={{backgroundColor:"#849371", borderRadius:"50%"}}/>
                    <div className="colorTile" style={{backgroundColor:"#fef9e7", borderRadius:"50%"}}/>
                    <div className="colorTile" style={{backgroundColor:"#b7950b", borderRadius:"50%"}}/>
                    <div className="colorTile" style={{backgroundColor:"#e59866", borderRadius:"50%"}}/>
                    <div className="colorTile" style={{backgroundColor:"#b3b6b7", borderRadius:"50%"}}/>
                </Box>
            </div>
            <div className="productDescription">
                <h2 className="productTitle">Agave Crochet Shirt</h2>
                <h3 className="price">$10.99</h3>
                <h3 className="description">This pattern is inspired by the Agave plant when cut down to make Tequila. It is a lightweight and breathable, unisex shirt, perfect for the summer.</h3>
                <button>Add to cart</button>
                <table>
                    <tr>
                        <td className="productProperty">Craft</td>
                        <td className="value">Crochet</td>
                    </tr>
                    <tr>
                        <td className="productProperty">Hook size</td>
                        <td className="value">6mm</td>
                    </tr>
                    <tr>
                        <td className="productProperty">Gauge</td>
                        <td className="value">16 stitches x 28 rows = 4 on.</td>
                    </tr>
                    <tr>
                        <td className="productProperty">Category</td>
                        <td className="value">Outerwear</td>
                    </tr>
                    <tr>
                        <td className="productProperty">Language</td>
                        <td className="value">English</td>
                    </tr>
                </table>
            </div>
    </div>
  );
};

export default PurchasePage;