import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { Modal } from '@/components/Modal';

interface AddProductForm {
  name: string;
  price: string;
  vendor: string;
  sku: string;
}

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const {
    register,
    handleSubmit: submit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductForm>();

  function handleOpenChange(value: boolean) {
    if (!value) reset();
    onOpenChange(value);
  }

  async function handleSubmit() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    onOpenChange(false);
    reset();
    toast.success('Товар успешно добавлен');
  }

  return (
    <Modal open={open} onOpenChange={handleOpenChange} title="Добавить товар">
      <form className="flex flex-col gap-4" onSubmit={submit(handleSubmit)} noValidate>
        <div className="flex flex-col gap-4">
          <FormInput
            autoFocus
            label="Наименование"
            placeholder="Введите наименование"
            error={errors.name?.message}
            {...register('name', { required: 'Введите наименование' })}
          />
          <FormInput
            label="Цена"
            placeholder="0.00"
            type="number"
            min="0"
            step="0.01"
            error={errors.price?.message}
            {...register('price', {
              required: 'Введите цену',
              min: { value: 0, message: 'Цена не может быть отрицательной' },
            })}
          />
          <FormInput label="Вендор" placeholder="Введите вендора" {...register('vendor')} />
          <FormInput label="Артикул" placeholder="Введите артикул" {...register('sku')} />
        </div>
        <div className="flex justify-end gap-4 border-t border-gray-100">
          <Button type="submit" disabled={isSubmitting}>
            Добавить
          </Button>
          <Button type="button" variant="secondary" disabled={isSubmitting} onClick={() => handleOpenChange(false)}>
            Отмена
          </Button>
        </div>
      </form>
    </Modal>
  );
}
