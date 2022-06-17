import "./style.css"
import { useEffect, useState } from "react";
import { ICryptoCurrency } from "../../interfaces/ICryptoCurrency";
import { CryptoCurrencyService } from "../../services/CryptoCurrencyService";


type SearchBarProps = {
    setCryptoCurrencies: React.Dispatch<React.SetStateAction<ICryptoCurrency[]>>;
}

export function SearchBar(props: SearchBarProps) {
    const [keyword, setKeyword] = useState<string>("");

    useEffect(() => {
        const searchData = async () => {
            const data = await CryptoCurrencyService.search(keyword);
            props.setCryptoCurrencies(data)
        }

        searchData();
    }, [keyword])

    return (
        <div className="search-bar">
            <input type="text" placeholder="Procurar..." name="search" onChange={(e) => setKeyword(e.target.value)}/>
        </div>
    )
}