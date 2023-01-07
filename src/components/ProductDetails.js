import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import lists from "../json/buysell_mock.json";


export default function ProductDetails(){
  const params = useParams();
  const [details, setDetails] = useState({});

  useEffect(()=>{
    setDetails(lists[params.id-1]);
  }, [])

  return(
    <Fragment>
        <section>
          <article>
            <img src={details.img_url}/>
          </article>
          <article>
            <h3>{details.price}</h3>
            <h4>{details.item_name}</h4>
            <h5>{details.location}</h5>
          </article>
        </section>
    </Fragment>
  )
}