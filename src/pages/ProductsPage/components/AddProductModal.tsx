import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { ImageUpload } from '@/components/ImageUpload';
import { Modal } from '@/components/Modal';
import { type Product } from '@/entities/Product/model';

type AddProductForm = Omit<Product, 'id' | 'thumbnail'> & {
  image: File | null;
};

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const {
    register,
    control,
    handleSubmit: submit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductForm>({ defaultValues: { image: null } });

  function handleOpenChange(value: boolean) {
    if (!value) reset();
    onOpenChange(value);
  }

  async function handleSubmit(values: AddProductForm) {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onOpenChange(false);
    reset();
    toast.success(`Product "${values.title}" added successfully`);
  }

  return (
    <Modal className="max-w-2xl" open={open} onOpenChange={handleOpenChange} title="Add product">
      <form className="flex flex-col gap-4" onSubmit={submit(handleSubmit)} noValidate>
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <Controller
            control={control}
            name="image"
            render={({ field }) => <ImageUpload className="h-full" value={field.value} onChange={field.onChange} />}
          />
          <div className="flex flex-col gap-4">
            <FormInput
              autoFocus
              label="Name"
              placeholder="Enter name"
              error={errors.title?.message}
              {...register('title', { required: 'Enter name' })}
            />
            <FormInput label="Brand" placeholder="Enter brand" {...register('brand')} />
            <FormInput label="SKU" placeholder="Enter SKU" {...register('sku')} />
            <FormInput
              label="Price"
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
              error={errors.price?.message}
              {...register('price', {
                required: 'Enter price',
                min: { value: 0, message: 'Price cannot be negative' },
              })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 border-t border-gray-100">
          <Button type="submit" disabled={isSubmitting}>
            Add
          </Button>
          <Button type="button" variant="secondary" disabled={isSubmitting} onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
