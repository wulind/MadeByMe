import Header from "../FixedNav/Header";
import Box from "@mui/material/Box";
import "./PurchasePage.css";
import { CrochetPattern } from "../../types/Product";
import { useEffect, useState } from "react";
import strings from "../../assets/strings/strings";

// Used for testing purposes only
import { testingData } from "../../data/patterns";

interface PurchasePageProps {
  productId: string; // TODO: product not found page
}

const PurchasePage = (props: PurchasePageProps) => {
  const [productDetails, setProductDetails] = useState<CrochetPattern>();

  useEffect(() => {
    let product = testingData.find((p) => {
      if (p.id === props.productId) {
        return true;
      }
      return false;
    });

    setProductDetails(product as CrochetPattern);
  }, [props.productId]);

  return (
    <div className="productPage">
      <Header isSticky={true} />
      <div className="productImage">
        <img src={productDetails?.imageUrl} />
      </div>
      <div className="colorWayViewer">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "5em",
            width: "25em",
            "& > *": {
              borderRadius: "50%",
            },
          }}
        >
          {productDetails?.colorways.map((color, index) => {
            return (
              <div
                key={index}
                className="colorTile"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </Box>
      </div>
      <div className="productDescription">
        <h2 className="productTitle">{productDetails?.title}</h2>
        <h3 className="price">{`$${productDetails?.price}`}</h3>
        <h3 className="description">{productDetails?.description}</h3>
        <button>{strings.ADD_TO_CART}</button>
        <table>
          <tr>
            <td className="productProperty">{strings.CRAFT}</td>
            <td className="value">{productDetails?.craft}</td>
          </tr>
          <tr>
            <td className="productProperty">{strings.HOOK_SIZE}</td>
            <td className="value">{productDetails?.hookSize}</td>
          </tr>
          <tr>
            <td className="productProperty">{strings.GAUGE}</td>
            <td className="value">{productDetails?.gauge}</td>
          </tr>
          <tr>
            <td className="productProperty">{strings.CATEGORY}</td>
            <td className="value">{productDetails?.category}</td>
          </tr>
          <tr>
            <td className="productProperty">{strings.LANGUAGE}</td>
            <td className="value">{productDetails?.language}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PurchasePage;
