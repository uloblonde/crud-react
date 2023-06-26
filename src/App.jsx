import React, { useEffect, useState } from "react";
import Modal from "./assets/component/Modal";
import Card from "./assets/component/Card";
import Pagination from "./assets/component/Pagination";

function App() {
  const [data, setData] = useState({
    namaBarang: "",
    gambar: "",
    hargaBeli: 0,
    hargaJual: 0,
    stok: 0,
  });
  const [editData, setEditData] = useState({
    namaBarang: "",
    gambar: "",
    hargaBeli: 0,
    hargaJual: 0,
    stok: 0,
  });
  const [dataArray, setDataArray] = useState([]);
  const [gambarFile, setGambarFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOnChange = (e) => {
    if (e.target.name === "gambar") {
      setGambarFile(e.target.files[0]);
    } else if (modalOpen) {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAdd = () => {
    const samaNama = dataArray.some((item) => item.namaBarang === data.namaBarang);
    const MAX_FILE_SIZE = 100 * 1024;
    if (samaNama) {
      alert("nama barang sudah ada");
    } else {
      if (gambarFile.size > MAX_FILE_SIZE) {
        alert("Gambar terlalu besar");
      } else {
        setIsLoading(true);
        const newData = {
          ...data,
          gambar: gambarFile ? URL.createObjectURL(gambarFile) : "",
        };
        setTimeout(() => {
          setDataArray((item) => [...item, newData]);
          setGambarFile(null);
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  const handleEdit = (index) => {
    const editItem = dataArray[index];
    setEditData({
      namaBarang: editItem.namaBarang,
      gambar: editItem.gambar,
      hargaBeli: editItem.hargaBeli,
      hargaJual: editItem.hargaJual,
      stok: editItem.stok,
    });
    setEditIndex(index);
    openModal();
  };

  const handleEditModal = () => {
    let editDataArray = [...dataArray];
    editDataArray[editIndex] = {
      ...editDataArray[editIndex],
      ...editData,
    };

    if (gambarFile) {
      editDataArray[editIndex].gambar = URL.createObjectURL(gambarFile);
    }

    setDataArray(editDataArray);
    closeModal();
  };

  const handleHapus = (index) => {
    if (confirm("Apakah Anda ingin menghapusnya?")) {
      const editDataArray = dataArray.filter((_, i) => i !== index);
      setDataArray(editDataArray);
    } else {
      console.log("Tidak jadi menghapus");
    }
  };

  const lastPostIndex = currentPage * postPerPage; //4
  const firstPostIndex = lastPostIndex - postPerPage; //4 - 4
  const currentPost = dataArray.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="items-center flex flex-col">
        <div className="flex items-center mt-2 justify-between w-[40%]">
        {/* <input className="p-1 mt-2 mb-2 bg-gray-200 text-black w-1/2 rounded text-white shadow" placeholder="Cari Barang" type="text" onChange={handleSearch} value={searchTerm} /> */}
          <h1 className="font-bold  p-2 bg-gray-300 rounded">Tambah Barang</h1>
        </div>
        <div className="flex flex-col bg-gray-300 w-2/5 m-auto rounded shadow mt-2 items-center pb-4">
          <label className="mt-4">Nama Barang</label>
          <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="text" name="namaBarang" onChange={handleOnChange} />
          <label>Gambar Barang</label>
          <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="file" accept="image/jpeg, image/png, image/jpg" name="gambar" onChange={handleOnChange} />
          <label>Harga Beli</label>
          <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="number" name="hargaBeli" onChange={handleOnChange} />
          <label>Harga Jual</label>
          <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="number" name="hargaJual" onChange={handleOnChange} />
          <label>Stok</label>
          <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="number" name="stok" onChange={handleOnChange} />
          <button className="p-2 mt-5 bg-lime-400 rounded shadow" onClick={handleAdd}>
            Tambah
          </button>
        </div>
      </div>

      {isLoading ? (
        <>
          <h1>...Loading</h1>
        </>
      ) : (
        <>
          <div className="flex justify-center mb-5 flex-wrap ">
            <Card
              data={currentPost}
              dataArray={currentPost}
              handleHapus={handleHapus}
              handleEdit={handleEdit}
              modalOpen={modalOpen}
              closeModal={closeModal}
              editData={editData}
              handleOnChange={handleOnChange}
              handleEditModal={handleEditModal}
            />
          </div>
          <div className="flex justify-center">
            <Pagination totalPost={dataArray.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
