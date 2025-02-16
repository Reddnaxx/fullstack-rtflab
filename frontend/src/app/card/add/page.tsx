import { Suspense } from 'react';

import { AddCardForm } from '@/entities/card/ui';

const AddCardPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Suspense>
        <AddCardForm />
      </Suspense>
    </div>
  );
};

export default AddCardPage;
