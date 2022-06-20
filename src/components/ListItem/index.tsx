import "./style.css"
import { useCallback, useEffect, useState } from "react";
import { ICryptoCurrency } from "../../interfaces/ICryptoCurrency";
import { CryptoCurrencyService } from "../../services/CryptoCurrencyService";
import { IFormValidator } from "../../interfaces/IFormValidator";


type ListProps = {
    cryptoCurrency: ICryptoCurrency;
    isEditable?: boolean;
}

export function ListItem(props: ListProps) {
    const [cancel, setCancel] = useState<boolean>(true);
    const [edit, setEdit] = useState<boolean>(false);
    
    const [thisAbbreviations, setThisAbbreviations] = useState<string>(props.cryptoCurrency.abbreviations);
    const [thisDescription, setThisDescription] = useState<string>(props.cryptoCurrency.description);
    const [thisPrice, setThisPrice] = useState<string>(props.cryptoCurrency.price.toString());
    
    const [thisCryptoCurrency, setThisCryptoCurrency] = useState<ICryptoCurrency>(props.cryptoCurrency);

    const [formValidator, setFormValidator] = useState<IFormValidator>({
        abbreviations: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        setThisCryptoCurrency({...thisCryptoCurrency, 
            abbreviations: thisAbbreviations,
            description: thisDescription,
            price: parseFloat(thisPrice)
        });

    }, [thisAbbreviations, thisDescription, thisPrice]);

    const updateSubmit = useCallback(async () => {
        if(thisAbbreviations.length == 0) {
            setFormValidator({abbreviations: "Campo sigla está vazio!"});
            return;
        } else {
            if (formValidator?.abbreviations) {
                setFormValidator({abbreviations: ""});
            }
        }

        if(thisDescription.length == 0) {
            setFormValidator({description: "Campo descrição está vazio!"});
            return;
        } else {
            if (formValidator?.description) {
                setFormValidator({description: ""});
            }
        }

        if(thisPrice.length == 0) {
            setFormValidator({price: "Campo preço está vazio!"});
            return;
        } else {
            if (!parseFloat(thisPrice)) {
                setFormValidator({price: "Campo preço precisa ser decimal!"});
                return;
            } else {
                if (formValidator?.price) {
                    setFormValidator({price: ""});
                }
            }
        }     
        
        await CryptoCurrencyService.put(thisCryptoCurrency);
        location.reload();
    }, [thisAbbreviations, thisDescription, thisPrice, formValidator, setFormValidator, thisCryptoCurrency]) 

    const deleteSubmit = useCallback(async () => {
        if (thisCryptoCurrency.id) {
            await CryptoCurrencyService.deleteById(thisCryptoCurrency.id)
            location.reload();
        }
    }, [thisCryptoCurrency]) 

    return (
        <>
            {!props.isEditable ? (
                <div id={props.cryptoCurrency.id?.toString()} className="list-item">
                    <div>
                        <div className="pill">{props.cryptoCurrency.abbreviations}</div>
                        <div className="list-item-content">
                            <h4>{props.cryptoCurrency.description}</h4>
                        </div>
                        <div className="list-item-content">
                            <h5>{`R$${props.cryptoCurrency.price}`}</h5>
                        </div>
                    </div>
                </div>
            ) : (
                <div id={props.cryptoCurrency.id?.toString()} className="list-item">
                    {edit && !cancel && (
                        <>
                            <div>
                                <div className="list-item-edit">
                                    <input
                                        name="editAbbreviations" 
                                        type="text" 
                                        value={thisAbbreviations}
                                        onChange={(e) => setThisAbbreviations(e.target.value.toUpperCase())}
                                        maxLength={5}
                                    />
                                    {formValidator?.abbreviations && (<p>{formValidator.abbreviations}</p>)}
                                </div>
                                <div className="list-item-edit">
                                    <input 
                                        name="editDescription" 
                                        type="text" 
                                        value={thisDescription}
                                        onChange={(e) => setThisDescription(e.target.value)}
                                    />
                                    {formValidator?.description && (<p>{formValidator.description}</p>)}
                                </div>
                                <div className="list-item-edit">
                                    <input 
                                        name="editPrice" 
                                        type="text" 
                                        value={thisPrice}
                                        onChange={(e) => setThisPrice(e.target.value)}
                                    />
                                    {formValidator?.price && (<p>{formValidator.price}</p>)}
                                </div>
                            </div>
                            <div>
                                <button className="update-button" onClick={updateSubmit}>
                                    <i className="material-icons">save</i>
                                </button>
                                <button className="delete-button" onClick={deleteSubmit}>
                                    <i className="material-icons">delete</i>
                                </button>
                                <button className="cursor" onClick={() => {
                                    setEdit(false);
                                    setCancel(true);
                                }}>
                                    <i className="material-icons">cancel</i>
                                </button>
                            </div>
                        </>
                    )}
                    {cancel && (
                        <>
                            <div>
                                <div className="pill">{props.cryptoCurrency.abbreviations}</div>
                                <div className="list-item-content">
                                    <h4>{props.cryptoCurrency.description}</h4>
                                </div>
                                <div className="list-item-content">
                                    <h5>{`R$${props.cryptoCurrency.price}`}</h5>
                                </div>
                            </div>
                            <div>
                                <button className="cursor" onClick={() => {
                                    setEdit(true);
                                    setCancel(false);
                                }}>
                                    <i className="material-icons">edit</i>
                                </button>
                            </div>
                        </>
                    )}                    
                </div>
            )}
        </>
    )
}