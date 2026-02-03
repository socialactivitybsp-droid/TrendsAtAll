import './stylings/SaaSOverview.css';

const highlights = [
  {
    title: 'Workspace-ready accounts',
    detail: 'Invite teammates, assign roles, and manage access from a single admin console.',
  },
  {
    title: 'Saved trend briefs',
    detail: 'Curate trend collections and share them as repeatable reports for stakeholders.',
  },
  {
    title: 'Alerting & monitors',
    detail: 'Configure keyword, product, and artist alerts that notify your team instantly.',
  },
  {
    title: 'Exportable insights',
    detail: 'Download CSV snapshots and feed the data into internal analytics workflows.',
  },
];

const tiers = [
  {
    name: 'Starter',
    price: '$49/mo',
    description: 'For solo founders validating fast-moving markets.',
    items: ['1 workspace', 'Daily trend snapshots', 'Basic exports'],
  },
  {
    name: 'Growth',
    price: '$149/mo',
    description: 'For product teams tracking multiple categories.',
    items: ['Up to 10 seats', 'Realtime alerts', 'Shared trend boards'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large orgs and data teams.',
    items: ['Unlimited seats', 'Custom data pipelines', 'Dedicated success manager'],
  },
];

function SaaSOverview() {
  return (
    <section className="saas">
      <header className="saas__header">
        <div>
          <p className="saas__eyebrow">SaaS-ready foundation</p>
          <h2>Built to scale into a full Trend Intelligence Platform</h2>
          <p>
            The MVP now supports a roadmap for monetization, collaboration, and enterprise data workflows without
            changing the UI flow.
          </p>
        </div>
        <button className="saas__cta" type="button">
          Request early access
        </button>
      </header>

      <div className="saas__grid">
        {highlights.map((item) => (
          <article key={item.title} className="saas__card">
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="saas__tiers">
        {tiers.map((tier) => (
          <article key={tier.name} className="saas__tier">
            <div>
              <h3>{tier.name}</h3>
              <p className="saas__price">{tier.price}</p>
              <p className="saas__description">{tier.description}</p>
            </div>
            <ul>
              {tier.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SaaSOverview;
