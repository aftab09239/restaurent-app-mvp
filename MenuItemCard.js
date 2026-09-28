import React from 'react';
export default React.memo(function MenuItemCard({item, colors, favorite, onFavorite, onAdd}) {
  console.log('MenuItemCard render:', item.id);
  return null;
});
