import OpengraphImage from 'components/opengraph-image';
import { getCategory } from 'lib/medusa';

export const runtime = 'edge';

export default async function Image({ params }: { params: Promise< { collection: string }> }) {
  const { collection: ParamsCollection } = await params;
  const collection = await getCategory(ParamsCollection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
