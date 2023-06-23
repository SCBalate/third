import React, { useState } from 'react';

const SnackTable = ({ snacks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

 
  const handleSort = (column) => {
    if (column === sortColumn) {
     
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
     
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const filteredSnacks = snacks.filter(
    (snack) =>
      snack.product_name.toLowerCase().includes(searchTerm) ||
      snack.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm)
      )
  );

  const sortedSnacks = filteredSnacks.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (sortOrder === 'asc') {
      if (columnA < columnB) return -1;
      if (columnA > columnB) return 1;
      return 0;
    } else {
      if (columnA > columnB) return -1;
      if (columnA < columnB) return 1;
      return 0;
    }
  });

  return (
    <div>
      <h2>Snack Table</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr >
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('product_name')}>Product Name</th>
            <th onClick={() => handleSort('product_weight')}>Product Weight</th>
            <th onClick={() => handleSort('price')}>Price</th>
            <th onClick={() => handleSort('calories')}>Calories</th>
            <th onClick={() => handleSort('ingredients')}>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {sortedSnacks.map((snack) => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SnackTable;
