import apisauce from 'apisauce';

import Config from '../config';

const create = (baseURL = Config.baseUrl) => {
    const api = apisauce.create({baseURL})

    //GET
    const getBarangAll = () => api.get(`barang/`)
    const getBarangId = (id) => api.get(`barang/${id}`)
    const getKategori = () => api.get(`kategori/`)
    

    //POST
    const addBarang = (nama, jumlah, kategori) => api.post(`barang/?key=${Config.key}`, {name: nama, count: jumlah, id_kategori: kategori})
    const addKategori = (nama) => api.post(`kategori/?key=${Config.key}`, {name: nama})

    //PUT
    const editBarang = (id, nama, jumlah, kategori) => api.put(`barang/${id}?key=${Config.key}`, {name: nama, count: jumlah, id_kategori: kategori})
    const editKategori = (id, nama) => api.put(`kategori/${id}?name=${nama}?key=${Config.key}`)

    //DELETE
    const delBarang = (id) => api.delete(`barang/${id}?key=${Config.key}`)

    return {
        getBarangAll, getBarangId, addBarang, editBarang, delBarang, getKategori, addKategori, editKategori
    }
}

export default {
    create
}