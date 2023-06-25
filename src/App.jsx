import { useState } from "react";

function App() {
  const [data, setData] = useState({
    namaBarang: "",
    gambar: "",
    hargaBeli: 0,
    hargaJual: 0,
    stok: 0,
  });
  const [images, setImage] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOnChange = (e) => {
    if (e.target.name === "gambar") {
      setImage(e.target.files[0]);
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAdd = () => {
    const checkName = dataArray.some((item) => item.namaBarang === data.namaBarang);
    if (checkName) {
      alert("Nama sudah ada");
    } else {
      const newData = {
        ...data,
        gambar: images ? URL.createObjectURL(images) : "",
      };
      setDataArray((item) => [...item, newData]);
      setImage(null);
    }
  };

  return (
    <>
      <input type="text" name="namaBarang" onChange={handleOnChange} />
      <input type="file" accept="image/jpeg, image/png, image/jpg" name="gambar" onChange={handleOnChange} />
      <input type="number" name="hargaBeli" onChange={handleOnChange} />
      <input type="number" name="hargaJual" onChange={handleOnChange} />
      <input type="number" name="stok" onChange={handleOnChange} />
      <button onClick={handleAdd}>Add</button>
      {dataArray.map((item, index) => (
        <div key={index}>
          <img src={item.gambar} alt="" />
          <p>Beli: Rp. {item.hargaBeli}</p>
          <p>Jual: Rp. {item.hargaJual}</p>
          <p>Stok: {item.stok}</p>
        </div>
        
      ))}
    </>
  );
}

export default App;
