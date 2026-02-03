import './stylings/ErrorState.css';

function ErrorState({ message }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon">!</div>
      <div>
        <h3>Connection issue</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorState;
