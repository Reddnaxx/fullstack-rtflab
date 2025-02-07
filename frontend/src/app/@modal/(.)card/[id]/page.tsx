import type { ICard } from '@/entities/card/models';
import { UserCard } from '@/entities/card/ui';
import { Modal } from '@/shared/ui';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cards = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`, {
    credentials: 'include',
  }).then(res => res.json());

  return cards.map((card: ICard) => ({
    id: card.id,
  }));
}

const CardModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const card = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards/${id}`, {
    credentials: 'include',
  }).then(res => res.json());

  return (
    <Modal>
      <UserCard variant="flat" {...card} />
    </Modal>
  );
};

export default CardModal;
