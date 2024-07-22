export const generateDescription = (cameraType = '', cameraCategory = ''): string => {

  const categoryEndings: Record<string, string> = {
    Фотоаппарат: 'фотоаппарат',
    Видеокамера: 'видеокамера',
  };

  const typeEnding = cameraCategory === 'Фотоаппарат' ? 'Цифровой' : cameraType;

  const description = `${typeEnding.charAt(0).toUpperCase()}${typeEnding.slice(1).toLowerCase()} ${categoryEndings[cameraCategory]?.toLowerCase() || ''}`;

  return description;
};
