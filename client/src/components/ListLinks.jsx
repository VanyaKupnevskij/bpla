import { Link } from 'react-router-dom';

export default function ListLinks({ links }) {
  if (links.length === 0) {
    return <p className="center">Посилань поки немає</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Оригінальна</th>
          <th>Скорочена</th>
          <th>Деталі</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={'/detail/' + link._id}>Відкрити</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
