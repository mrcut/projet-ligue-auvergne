import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/ProduitsListe")
      .then((resp) => {
        setproducts(resp.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div>
      <br />
      <div className="button-add">
        <Link to={`/addFilm`} className="btn btn-dark">
          Ajouter un Film
        </Link>
      </div>
      <div className="div-products">
        {products.map((product, index) => (
          <div key={index} className="div-product">
            <h4>Products List</h4>
            <div className="title">{film.title}</div>

            <div className="buttons-film">
              <Link
                to={`/film/detail/${product._id}`}
                className="btn btn-primary"
              >
                Détail
              </Link>
              <Link
                to={`/ProduitModifier/${product._id}`}
                className="btn btn-warning"
              >
                modifier
              </Link>
              <Link
                to={`/ProduitSuprimmer/${product._id}`}
                className="btn btn-danger"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
