import { UserCard } from '@/entities/card/ui';
import { Modal } from '@/shared/ui';

const ModalCardLoading = () => {
  return (
    <Modal>
      <UserCard.Loading />
    </Modal>
  );
};

export default ModalCardLoading;
