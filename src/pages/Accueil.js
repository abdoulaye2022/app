import React, { useEffect, useState } from "react";
import "./Accueil.css";
import axios from "axios";

export default function Accueil() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState("");

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('image', image); // Assuming 'image' is a file input
  
    axios
      .post("http://localhost:8080/api/", formData)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        // Handle errors
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/${id}`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <h1>
        Welcome to Stock-Management <br /> Application
      </h1>
      <div>
        <hr />
        <h3>Add product</h3>
        <label htmlFor="name">Name</label> &nbsp;
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <br />
        <br />
        <label htmlFor="quantity">Quantity</label> &nbsp;
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          id="quantity"
        />
        <br />
        <br />
        <label htmlFor="price">Price</label> &nbsp;
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="price"
        />
        <br />
        <br />
        <label htmlFor="file">Image</label> &nbsp;
        <input
          type="file"
          onChange={handleFileChange}
          id="file"
        />
        <br />
        <br />
        <button style={{ width: "10%" }} onClick={handleSubmit}>
          Save
        </button>
        <h3>Liste des utilisateurs</h3>
        <table>
          <thead>
            <tr>
              <td width="2%">#</td>
              <td width="40%">Name</td>
              <td width="10%">Quantity</td>
              <td width="20%">Price</td>
              <td width="28%">Action</td>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.quantity}</td>
                    <td>{p.price} $</td>
                    <td>
                      <button>Update</button> &nbsp;
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
