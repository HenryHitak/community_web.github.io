import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../css/buysell.module.css";
import products from "../json/buysell_mock.json";
import $ from "jquery";

export default function Marketplace(){
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [listIndex, setListIndex] = useState(8);
  useEffect(()=>{
    setList(products);
  }, [])

  const goToDetail = (id) =>{
    console.log(id);
    navigate(`/details/${id}`);
  }

  const loadMore = (e) => {
    setListIndex(listIndex + 8);
    if(list.length < listIndex){
      $(e.target).hide();
    }
  }
  return(
      <Fragment>
        <section>
          <form>
            <article>
              <input placeholder="Search Marketplace"/>
            </article>
          </form>
        </section>
        <section className={styles.reco_sec}>
          <nav className={styles.reco_nav}>
            <h2>Recommended items for you</h2>
            <h2>Your location is</h2>
          </nav>
          <ul className={styles.reco_list}>
          {list.slice(0, listIndex).map((val, idx)=>{
            return(
              <li key={idx} onClick={()=>goToDetail(val.id)}>
                <figure>
                  <img src={val.img_url} alt="example img"/>
                  <figcaption>
                    <h3>{val.price}</h3>
                    <h4>{val.item_name}</h4>
                    <h5>{val.location}</h5>
                  </figcaption>
                </figure>
              </li>
            )
          })}
          </ul>
          <button className={styles.loadBtn} onClick={(e)=>loadMore(e)}>View more</button>
        </section>
      </Fragment>
  )
}