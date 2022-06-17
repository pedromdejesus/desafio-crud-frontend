import "./style.css"
import { useEffect, useState } from "react"
import { ICryptoCurrency } from "../../interfaces/ICryptoCurrency";
import { CryptoCurrencyService } from "../../services/CryptoCurrencyService";
import { ListItem } from "../ListItem"
import { SearchBar } from "../SearchBar";


export function List() {
    const [cryptoCurrencies, setCryptoCurrencies] = useState<ICryptoCurrency[]>([]);
    const [isAll, setIsAll] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
                        checked={isAll}
                        type="radio"
                        onClick={() => {
                            setIsAll(true);
                            setIsEdit(false);
                        }}
                    >
                    </input>
                    <h3>Todos</h3>
                </div>
                <div className="list-nav-item">
                    <input
                        className="cursor"
                        checked={isEdit}
                        type="radio"
                        onClick={() => {
                            setIsAll(false);
                            setIsEdit(true);
                        }}
                    />
                    <h3>Editar</h3>
                </div>
            </div>
            <div className="list">
                {cryptoCurrencies.length > 0 && isAll && (
                    cryptoCurrencies.map(cc => (
                        <ListItem cryptoCurrency={cc} />
                    ))
                )}
                {cryptoCurrencies.length > 0 && isEdit && (
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