import "./style.css"
import { useEffect, useState } from "react"
import { ICryptoCurrency } from "../../interfaces/ICryptoCurrency";
import { CryptoCurrencyService } from "../../services/CryptoCurrencyService";
import { ListItem } from "../ListItem"
import { SearchBar } from "../SearchBar";


export function List() {
    const [cryptoCurrencies, setCryptoCurrencies] = useState<ICryptoCurrency[]>([]);
    const [all, setAll] = useState<boolean>(true);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await CryptoCurrencyService.getAll();
            setCryptoCurrencies(data);
        }

        fetchData();
    }, [])

    return (
        <>
            <SearchBar setCryptoCurrencies={setCryptoCurrencies} />
            <div className="list-nav">
                <div className="list-nav-item">
                    <input
                        className="cursor"
                        checked={all}
                        type="radio"
                        onClick={() => {
                            setAll(true);
                            setEdit(false);
                        }}
                    >
                    </input>
                    <h3>Todos</h3>
                </div>
                <div className="list-nav-item">
                    <input
                        className="cursor"
                        checked={edit}
                        type="radio"
                        onClick={() => {
                            setAll(false);
                            setEdit(true);
                        }}
                    />
                    <h3>Editar</h3>
                </div>
            </div>
            <div className="list">
                {cryptoCurrencies.length > 0 && all && (
                    cryptoCurrencies.map(cc => (
                        <ListItem cryptoCurrency={cc} />
                    ))
                )}
                {cryptoCurrencies.length > 0 && edit && (
                    cryptoCurrencies.map(cc => (
                        <ListItem cryptoCurrency={cc} isEditable />
                    ))
                )}
            </div>
            {cryptoCurrencies.length == 0 && (
                <h2>Não há Registros!</h2>
            )}
        </>
    )
}