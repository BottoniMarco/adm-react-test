import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from "./Components/Modal";


function App() {
  const [data, setData] = useState([])
  const [planet, setPlanet] = useState([])
  const [count, setCount] = useState(2)
  const [openModal, setOpenModal] = useState(false)
  const [order, setOrder] = useState("ASC");


    useEffect(() => {
      axios.get("https://swapi.dev/api/people/?page=1")
      .then((result) => {
        setData(result.data.results)
      }).catch((error) => {
        console.log(error);
      });
    },
    []
    )

    const getData = () =>{
      axios.get("https://swapi.dev/api/people/?page="+count.toString())
      .then((result) => {
        setData(result.data.results)
      }).catch((error) => {
        console.log(error);
      });
    }

    const getPlanet = (event, param) =>{
      console.log("param",param);
      axios.get(param)
      .then((result) => {
        setPlanet(result.data)
      }).catch((error) => {
        console.log(error);
      });
    }


    const sorting = (col) => {
      if (order === "ASC") {
        const sorted = [...data].sort((a,b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted);
        setOrder("DSC");
      } else{
        const sorted = [...data].sort((a,b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted);
        setOrder("ASC");
      }
    }


  
  return (
    <div className="App">
      <table>
        <thead>
          <th onClick={() => sorting("name")}>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Planet</th>
        </thead>
        <tbody>
          
          { data.map((d=>( 
            <tr key={d.id}>
            <td>{d.name}</td>
            <td>{d.height}</td>
            <td>{d.mass}</td>
            <td>{d.created}</td>
            <td>{d.edited}</td>
            <td onClick={event => getPlanet(event, d.homeworld)}><a  onClick={() => {setOpenModal(true);}}>{d.homeworld}</a></td>
          </tr>
        )))}
        </tbody>
        {openModal && <Modal planetSpec={planet} closeModal={setOpenModal}/>}

      </table>
        <div className='changePage'>
          <a className='scrollPage' onClick={() => {count <= 1 ? setCount(1) :setCount(count - 1); getData();}}>&laquo; Previous</a>
          <a className='scrollPage' onClick={() => { count >= 9 ? setCount(9) : setCount(count + 1); getData();}}>Next &raquo;</a>
        </div>      
    </div>
  );
}

export default App;
