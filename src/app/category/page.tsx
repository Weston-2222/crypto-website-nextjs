import { fetchCoinCategoriesData } from '@/services/coin/coinGecko';
import CategoryTable from './categoryTable';

const page = async () => {
  const data = await fetchCoinCategoriesData();
  return <CategoryTable data={data} />;
};

export default page;
