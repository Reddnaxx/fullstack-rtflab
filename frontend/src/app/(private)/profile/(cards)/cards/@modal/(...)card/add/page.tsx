import { Suspense } from 'react';

import { AddCardForm } from '@/entities/card/ui';
import { Modal } from '@/shared/ui';

const AddCardModal = async () => {
  return (
    <Modal className="w-full max-w-xl">
      <Suspense>
        <AddCardForm />
      </Suspense>
    </Modal>
  );
};

export default AddCardModal;
