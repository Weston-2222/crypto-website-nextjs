import { getCoinCategoriesData } from '@/services/coinGecko/coinCategories';
import CategoryTable from './categoryTable';
export const revalidate = 60;
const page = async () => {
  try {
    const data = await getCoinCategoriesData();
    return <CategoryTable data={data} />;
  } catch {
    return <p>無法取得類別資料</p>;
  }
};

export default page;
