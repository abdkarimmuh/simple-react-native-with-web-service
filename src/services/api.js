import apisauce from 'apisauce';

import Config from '../config';

const create = (baseURL = Config.baseUrl) => {
    const api = apisauce.create({baseURL})

    //GET
    const getBarang = () => api.get(`barang/`)
    const getBarangById = (id) => api.get(`barang/${id}`)
    const getKategori = () => api.get(`kategori/`)
    const getKategoriById = (id) =>  api.get(`kategori/${id}`)
    

    //POST
    const addBarang = (nama, jumlah, kategori) => api.post(`barang/?key=${Config.key}`, {name: nama, count: jumlah, id_kategori: kategori})
    const addKategori = (nama) => api.post(`kategori/?key=${Config.key}`, {name: nama})

    //PUT
    const editBarang = (id, nama, jumlah, kategori) => api.put(`barang/${id}?key=${Config.key}`, {name: nama, count: jumlah, id_kategori: kategori})
    const editKategori = (id, nama) => api.put(`kategori/${id}?key=${Config.key}`, {name: nama})

    //DELETE
    const delBarang = (id) => api.delete(`barang/${id}?key=${Config.key}`)
    const delKategori = (id) => api.delete(`kategori/${id}?key=${Config.key}`)


    return {
        getBarang, getBarangById, addBarang, editBarang, delBarang, 
        getKategori, getKategoriById, addKategori, editKategori, delKategori
    }
}

export default {
    create
}