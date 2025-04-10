import React from 'react';

interface HeaderProps {
  bitIndices: number[];
  labelStyle: React.CSSProperties;
  tableCellStyle: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({
  bitIndices,
  labelStyle,
  tableCellStyle
}) => {
  return (
    <thead>
      <tr>
        <th className="bit-label" style={labelStyle}></th>
        {bitIndices.map(index => (
          <th 
            key={`header-${index}`} 
            className="bit-header"
            style={tableCellStyle}
          >
            {index}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header; 