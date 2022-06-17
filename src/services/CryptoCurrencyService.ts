
import { ICryptoCurrency } from "../interfaces/ICryptoCurrency";
import { api } from "./api/apiConfig";

const getAll = async (): Promise<ICryptoCurrency[]> => {
    const { data } = await api().get("/cryptocurrencies");
    return data;
};

const post = async (cryptoCurrency: ICryptoCurrency): Promise<ICryptoCurrency> => {
    const { data } = await api().post("/cryptocurrencies", cryptoCurrency);
    return data;
};

const put = async (cryptoCurrency: ICryptoCurrency): Promise<ICryptoCurrency> => {
    const { data } = await api().post("/cryptocurrencies", cryptoCurrency);
    return data;
};

const deleteById = async (id: number): Promise<number> => {
    const { data } = await api().delete(`/cryptocurrencies/${id}`);
    return data;
};

const search = async (keyword: string): Promise<ICryptoCurrency[]> => {
    const { data } = await api().get(`/cryptocurrencies/search/?keyword=${keyword}`);
    return data;
};

export const CryptoCurrencyService = {
    getAll,
    post,
    put,
    deleteById,
    search
};