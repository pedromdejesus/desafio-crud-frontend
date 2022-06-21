import "./style.css"
import { useCallback, useEffect, useState } from "react";
import { ICryptoCurrency } from "../../interfaces/ICryptoCurrency";
import { IFormValidator } from "../../interfaces/IFormValidator";
import { CryptoCurrencyService } from "../../services/CryptoCurrencyService";

export function Form() {
    const [newAbbreviations, setNewAbbreviations] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newPrice, setNewPrice] = useState<string>('0');

    const [newCryptoCurrency, setNewCryptoCurrency] = useState<ICryptoCurrency>({
        abbreviations: newAbbreviations,
        description: newDescription,
        price: newPrice,
    });

    const [formValidator, setFormValidator] = useState<IFormValidator>({
        abbreviations: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        setNewCryptoCurrency({...newCryptoCurrency, 
            abbreviations: newAbbreviations,
            description: newDescription,
            price: newPrice
        });

    }, [newAbbreviations, newDescription, newPrice]);

    const handleSubmit = useCallback(async () => {
        if(newAbbreviations.length == 0) {
            setFormValidator({abbreviations: "Campo sigla está vazio!"});
            return;
        } else {
            if (formValidator?.abbreviations) {
                setFormValidator({abbreviations: ""});
            }
        }

        if(newDescription.length == 0) {
            setFormValidator({description: "Campo descrição está vazio!"});
            return;
        } else {
            if (formValidator?.description) {
                setFormValidator({description: ""});
            }
        }

        if(newPrice.length == 0) {
            setFormValidator({price: "Campo preço está vazio!"});
            return;
        } else {
            if (parseFloat(newPrice) || parseFloat(newPrice) == 0) {
                if (formValidator?.price) {
                    setFormValidator({price: ""});
                }
            } else {
                setFormValidator({price: "Campo preço precisa ser decimal!"});
                return;
            }
        }     
        
        await CryptoCurrencyService.post(newCryptoCurrency);
        location.reload();
    }, [newAbbreviations, newDescription, newPrice, formValidator, setFormValidator, newCryptoCurrency]);

    return (
        <div className="form">
            <div className="form-item">
                <h3>Sigla</h3>
                <input
                    name="abbreviations" 
                    type="text" 
                    value={newAbbreviations}
                    onChange={(e) => setNewAbbreviations(e.target.value.toUpperCase())}
                    maxLength={5}
                />
                {formValidator?.abbreviations && (<p>{formValidator.abbreviations}</p>)}
            </div>
            <div className="form-item">
                <h3>Descrição</h3>
                <input 
                    name="description" 
                    type="text" 
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                {formValidator?.description && (<p>{formValidator.description}</p>)}
            </div>
            <div className="form-item">
                <h3>{`Cotação (R$)`}</h3>
                <input 
                    name="price" 
                    type="text" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                />
                {formValidator?.price && (<p>{formValidator.price}</p>)}
            </div>
            <button onClick={handleSubmit} className="button">
                <h3>Salvar</h3>
            </button>
        </div>
    )
}