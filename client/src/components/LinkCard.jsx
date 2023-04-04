export default function LinkCard({ link }) {
  return (
    <div>
      <h1>Посилання</h1>
      <p>
        Сгенероване посилання:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Оригінал:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Дата створення:
        <strong> {new Date(link.date).toLocaleDateString()}</strong>
      </p>
      <p>
        Кліків по посиланню:
        <strong> {link.clicks}</strong>
      </p>
    </div>
  );
}
