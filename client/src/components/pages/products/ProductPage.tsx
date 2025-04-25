import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import strings from "../../../assets/strings/common";
import { testingData } from "../../../data/patterns";
import { CrochetPattern } from "../../../types/Product";
import Header from "../../navigation/Header";
import "./ProductPage.css";

const ColorWayPicker = ({ colors }: { colors: string[] }) => {
  return (
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
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              className="rounded-full w-12 h-12 m-4 border-gray-500 border-[1px] border-solid"
              style={{ backgroundColor: color }}
              onClick={() => {}}
            />
          );
        })}
      </Box>
    </div>
  );
};

const DetailsTable = ({
  productDetails,
}: {
  productDetails: CrochetPattern;
}) => {
  return (
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
  );
};

const ProductPage = () => {
  const { productId } = useParams();
  const [ productDetails, setProductDetails] = useState<CrochetPattern>();
 
  useEffect(() => {
    let product = testingData.find((p) => {
      if (p.id === productId) {
        return true;
      }
      return false;
    });

    setProductDetails(product as CrochetPattern);
  }, []);

  return (
    <div className="productPage">
      <Header />
      <div className="productImage">
        <img src={productDetails?.imageUrl} />
      </div>
      <ColorWayPicker colors={productDetails?.colorways ?? []} />
      <div className="productInformation">
        <h2 className="productTitle">{productDetails?.title}</h2>
        <h3 className="font-normal">{`$${productDetails?.price}`}</h3>
        <h3 className="text-[#828282] font-normal">
          {productDetails?.description}
        </h3>
        <button className="bg-black text-white px-5 py-2 rounded my-4 cursor-pointer">
          {strings.ADD_TO_CART}
        </button>
        <DetailsTable productDetails={productDetails as CrochetPattern} />
      </div>
    </div>
  );
};

export default ProductPage;
