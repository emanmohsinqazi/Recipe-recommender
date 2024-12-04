import React from 'react';
import PropTypes from 'prop-types';

const NutrientBadge = ({ label, value }) => {
  return (
    <div className="text-center p-2 bg-emerald-50 rounded-lg">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="font-bold text-emerald-600">{value}g</div>
    </div>
  );
};



export default NutrientBadge;