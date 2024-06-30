import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const Table = ({ caption, fields, rows, resourceName }) => {
    return (
      <>
        <table className='table table-bordered table-striped bg-light-subtle border border-primary-subtle'>
          <caption>{caption}</caption>
          <thead>
            <tr>
              {fields.map((field, key) => (
                <th key={key}>
                  {field.label}
                  <i className="bi bi-sort-alpha-down"></i>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {fields.map((field, fieldIndex) => (
                    <td key={fieldIndex}>
                      {typeof row[field.name] === 'object' ? JSON.stringify(row[field.name]) : row[field.name]}
                    </td>
                  ))}
                  <td>
                    <Link className="btn btn-info mr-2" to={`/${resourceName}/${row.id}/update`} state={{ id: row.id }}>Edit</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={fields.length + 1} className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
};

Table.propTypes = {
  caption: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  resourceName: PropTypes.string.isRequired
};

export default Table;
