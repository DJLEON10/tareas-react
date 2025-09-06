import { useState } from "react";

function Contador() {
    const [count , setcount] = useState(0)

    //function aumentar (){
    //    setcount(count+1);
//}

    // disminuir (){
//setcount(count-1);
    //}

  return (
    <div>
      <h1>hola desde un hook</h1>
      <div className="container text-center">
        <h1>Contador:{count}</h1>
        <div className="btn-group">
          {/* <button onClick={aumentar} className="btn btn-success">Aumentar</button>
          <button onClick={disminuir} className="btn btn-danger">Disminuir</button> */}


          <button onClick={()=> setcount(count+1)} className="">aumentar</button>
          <button onClick={()=> setcount(count-1)} className="">disminuir</button>
            <a href="/">ir a home</a>
        </div>
      </div>
    </div>
  );
}

export default Contador;
