import "./style.css"
import { useCallback, useEffect, useState } from "react";
import { ICryptoCurrency } from "../../interfaces/ICryptoCurrency";
import { IFormValidator } from "../../interfaces/IFormValidator";
import { CryptoCurrencyService } from "../../services/CryptoCurrencyService";

export function Form() {
    const [abbreviations, setAbbreviations] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const [newCryptoCurrency, setNewCryptoCurrency] = useState<ICryptoCurrency>({
        abbreviations: "",
        description: "",
        price: 0,
    });

    const [formError, setFormError] = useState<IFormValidator>({
        abbreviations: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        setNewCryptoCurrency({...newCryptoCurrency, 
            abbreviations,
            description,
            price: parseFloat(price)
        });

    }, [abbreviations, description, price]);

    const handleSubmit = useCallback(async () => {
        console.log(formError)

        if(abbreviations.length == 0) {
            setFormError({...formError, abbreviations: "Campo sigla está vazio!"});
            return;
        } else {
            if (formError?.abbreviations) {
                formError.abbreviations = "";
            }
        }

        if(description.length == 0) {
            setFormError({...formError, description: "Campo descrição está vazio!"});
            return;
        } else {
            if (formError?.description) {
                formError.description = "";
            }
        }

        if(price.length == 0) {
            setFormError({...formError, price: "Campo preço está vazio!"});
            return;
        } else {
            if (!parseFloat(price)) {
                setFormError({...formError, price: "Campo preço precisa ser decimal!"});
                return;
            } else {
                if (formError?.price) {
                    formError.price = "";
                }
            }
        }     
        
        await CryptoCurrencyService.post(newCryptoCurrency);
        location.reload();
    }, [abbreviations, description, price, formError, setFormError, newCryptoCurrency]);

    return (
        <div className="form">
            <div className="form-item">
                <h3>Sigla</h3>
                <input
                    name="abbreviations" 
                    type="text" 
                    value={abbreviations}
                    onChange={(e) => setAbbreviations(e.target.value.toUpperCase())}
                    maxLength={5}
                />
                {formError?.abbreviations && (<p>{formError.abbreviations}</p>)}
            </div>
            <div className="form-item">
                <h3>Descrição</h3>
                <input 
                    name="description" 
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {formError?.description && (<p>{formError.description}</p>)}
            </div>
            <div className="form-item">
                <h3>{`Cotação (R$)`}</h3>
                <input 
                    name="price" 
                    type="text" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {formError?.price && (<p>{formError.price}</p>)}
            </div>
            <button onClick={handleSubmit} className="button">
                <h3>Salvar</h3>
            </button>
        </div>
    )
}