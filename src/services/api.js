import apisauce from 'apisauce';

import Config from '../config';

const create = (baseURL = Config.baseUrl) => {
    const api = apisauce.create({baseURL})

    //GET
    const getBarangAll = () => api.get(`barang/`)
    const getBarangId = (id) => api.get(`barang/${id}`)
    const searchBarang = (nama) => api.get(`barang?name=${nama}`)
    const getKategori = () => api.get(`kategori/`)
    

    //POST
    const addBarang = (nama, jumlah, kategori) => api.post(`barang/?key=${Config.key}`, {name: nama, count: jumlah, id_kategori: kategori})
    const addKategori = (nama) => api.post(`kategori/?key=${Config.key}`, {name: nama})

    //PUT
    // const editBarang = (id, nama) => api.put('/barang/' + id + '?name=')

    return {
        getBarangAll, getBarangId, searchBarang, addBarang, getKategori, addKategori
    }
}

export default {
    create
}