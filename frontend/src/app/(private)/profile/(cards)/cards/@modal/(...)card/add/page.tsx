import { AddCardForm } from '@/entities/card/ui';
import { Modal } from '@/shared/ui';

const AddCardModal = () => {
  return (
    <Modal className="w-full max-w-xl">
      <AddCardForm />
    </Modal>
  );
};

export default AddCardModal;
