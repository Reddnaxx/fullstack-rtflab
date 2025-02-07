import type { ICard } from '@/entities/card/models';
import { UserCard } from '@/entities/card/ui';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cards = await fetch(`http://localhost:8000/api/v1/cards`, {
    credentials: 'include',
  }).then(res => res.json());

  return cards.map((card: ICard) => ({
    id: card.id,
  }));
}

const CardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const card = await fetch(`http://localhost:8000/api/v1/cards/${id}`, {
    credentials: 'include',
  }).then(res => res.json());

  return <UserCard {...card} />;
};

export default CardPage;
