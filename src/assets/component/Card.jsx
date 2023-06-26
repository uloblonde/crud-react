// assets/component/Card.jsx
import React, { useState } from 'react';
import Modal from './Modal';

const Card = ({ data,dataArray, handleHapus, handleEdit, modalOpen, closeModal, editData, handleOnChange, handleEditModal }) => {
  console.log(data);
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="w-[20%] bg-gray-300 mt-5 rounded shadow items-center flex flex-col p-2 ms-5">
          <img className="aspect-[4/2]" src={item.gambar} alt="" />
          <div>
            <h2 className=" font-bold">{item.namaBarang}</h2>
            <p>Beli: Rp. {item.hargaBeli}</p>
            <p>Jual: Rp. {item.hargaJual}</p>
            <p>Stok: {item.stok}</p>
          </div>
          <div>
            <button className="p-2 bg-red-700 rounded" onClick={() => handleHapus(index)}>
              Hapus
            </button>
            <button className="p-2 ms-2 bg-green-500 rounded" onClick={() => handleEdit(index)}>
              Update
            </button>
          </div>
          <div>
            <Modal isOpen={modalOpen} onClose={closeModal}>
              <div className="flex flex-col  m-auto rounded ">
                <h1 className="font-bold text-center">Update Barang</h1>
                <label className="mt-2">Nama Barang</label>
                <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="text" value={editData.namaBarang} name="namaBarang" onChange={handleOnChange} />
                <label>Gambar Barang</label>
                <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="file" accept="image/jpeg, image/png, image/jpg" name="gambar" onChange={handleOnChange} />
                <label>Harga Beli</label>
                <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="number" value={editData.hargaBeli} name="hargaBeli" onChange={handleOnChange} />
                <label>Harga Jual</label>
                <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="number" value={editData.hargaJual} name="hargaJual" onChange={handleOnChange} />
                <label>Stok</label>
                <input className="p-1 mb-2 bg-slate-500 w-96 rounded text-white shadow" type="number" value={editData.stok} name="stok" onChange={handleOnChange} />
                <button className="p-2 mt-5 bg-lime-400 rounded shadow" onClick={handleEditModal}>
                  Update
                </button>
              </div>
            </Modal>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;