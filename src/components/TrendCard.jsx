import './stylings/TrendCard.css';

function TrendCard({ item }) {
  return (
    <a className="trend-card" href={item.url} target="_blank" rel="noreferrer">
      {item.image ? (
        <div className="trend-card__image">
          <img src={item.image} alt={item.title} loading="lazy" />
        </div>
      ) : (
        <div className="trend-card__image trend-card__image--placeholder">
          <span>{item.platform}</span>
        </div>
      )}
      <div className="trend-card__details">
        <div className="trend-card__header">
          <span className="trend-card__rank">#{item.rank}</span>
          <span className="trend-card__platform">{item.platform}</span>
        </div>
        <h4 className="trend-card__title">{item.title}</h4>
        <p className="trend-card__subtitle">{item.subtitle}</p>
      </div>
    </a>
  );
}

export default TrendCard;
