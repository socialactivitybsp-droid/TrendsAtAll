import './stylings/Loader.css';

function Loader({ message }) {
  return (
    <div className="loader">
      <div className="loader__spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default Loader;
