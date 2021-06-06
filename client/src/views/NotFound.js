import {Link} from "react-router-dom";

const NotFound = () => (
  <section aria-labelledby="notfound-title">
    <h1 id="notfound-title">No hay nada en esta dirección</h1>
    <Link to="/">Volver</Link>
  </section>
);

export default NotFound;
