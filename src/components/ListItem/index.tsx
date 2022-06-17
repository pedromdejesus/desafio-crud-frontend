import "./style.css"
import { useCallback, useState } from "react";
import { ICryptoCurrency } from "../../interfaces/ICryptoCurrency";
import { CryptoCurrencyService } from "../../services/CryptoCurrencyService";


type ListProps = {
    cryptoCurrency: ICryptoCurrency;
    isEditable?: boolean;
}

export function ListItem(props: ListProps) {
    const [isCancel, setIsCancel] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [CC, setCC] = useState<ICryptoCurrency>(props.cryptoCurrency);

    const updateSubmit = useCallback(async () => {
        if (CC.abbreviations == "") {
            alert("Sigla Vazia!");
            return;
        }

        if (CC.description == "") {
            alert("Descrição Vazia!");
            return;
        }

        await CryptoCurrencyService.put(CC)
        location.reload();
    }, [CC]) 

    const deleteSubmit = useCallback(async () => {
        if (CC.id) {
            await CryptoCurrencyService.deleteById(CC.id)
            location.reload();
        }
    }, [CC]) 

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
                    {isEdit && !isCancel && (
                        <>
                            <div>
                                <input
                                    name="editAbbreviations" 
                                    type="text" 
                                    value={CC.abbreviations}
                                    onChange={(e) => setCC({
                                        ...CC, 
                                        abbreviations: e.target.value.toUpperCase()
                                    })}
                                    maxLength={5}
                                />
                                <input 
                                    name="editDescription" 
                                    type="text" 
                                    value={CC.description}
                                    onChange={(e) => setCC({
                                        ...CC, 
                                        description: e.target.value
                                    })}
                                />
                                <input 
                                    name="editPrice" 
                                    type="text" 
                                    value={CC.price}
                                    onChange={(e) => setCC({
                                        ...CC, 
                                        price: parseInt(e.target.value)
                                    })}
                                />
                            </div>
                            <div>
                                <button className="update-button" onClick={updateSubmit}>
                                    <i className="material-icons">save</i>
                                </button>
                                <button className="delete-button" onClick={deleteSubmit}>
                                    <i className="material-icons">delete</i>
                                </button>
                                <button className="cursor" onClick={() => {
                                    setIsEdit(false);
                                    setIsCancel(true);
                                }}>
                                    <i className="material-icons">cancel</i>
                                </button>
                            </div>
                        </>
                    )}
                    {isCancel && (
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
                                    setIsEdit(true);
                                    setIsCancel(false);
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