import TrendCard from './TrendCard';
import './stylings/CategorySection.css';

function CategorySection({ title, description, sections }) {
  return (
    <section className="category">
      <header className="category__header">
        <div>
          <h2 className="category__title">{title}</h2>
          <p className="category__description">{description}</p>
        </div>
      </header>
      <div className="category__grid">
        {sections.map((section) => (
          <div key={section.title} className="category__panel">
            <div className="category__panel-header">
              <h3>{section.title}</h3>
              <span className="category__panel-meta">{section.subtitle}</span>
            </div>
            <div className="category__cards">
              {section.items.map((item) => (
                <TrendCard key={`${section.title}-${item.rank}-${item.title}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
