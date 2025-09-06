import { useState } from "react";

function contador(){

    const [count, setCount ] = useState(0);

    //function aumentar(){
      //  setCount(count+1);

    //}
    //function disminuir(){
      //  setCount(count-1);

    //}
    return(
        <div>
            <h1>Contador: {count}</h1>
            <div className="container text-center"></div>
            <div className="btn-group">
                {/* <button onClick={aumentar} className="btn btn_success"> Aumentar </button> */}
                {/* <button onClick={disminuir} className="btn btn-warning">Dismunir</button> */}
                <button onClick={() => setCount(count+1)} className="btn btn_success "> Aumentar </button>
                <button onClick={() => setCount(count-1)} className="btn btn_warning"> Aumentar </button>
                <a href="/" className="list-group-item">ir a HomeHooks</a>
            </div>
        </div>
    );
}
export default contador;