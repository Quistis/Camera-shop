enum AllowedCategory {
  Видеокамера = 'Видеокамера',
  Фотоаппарат = 'Фотоаппарат',
}

enum AllowedType {
  Коллекционная = 'Коллекционная',
  Моментальная = 'Моментальная',
  Цифровая = 'Цифровая',
  Плёночная = 'Плёночная',
}

enum AllowedLevel {
  Нулевой = 'Нулевой',
  Любительский = 'Любительский',
  Профессиональный = 'Профессиональный'
}

export type TCamerasCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: AllowedType;
  category: AllowedCategory;
  description: string;
  level: AllowedLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
