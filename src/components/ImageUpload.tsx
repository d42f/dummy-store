import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

import ImageIcon from '@assets/icons/image.svg?react';

import { CloseButton } from '@/components/CloseButton';
import { cn } from '@/lib/cn';

interface ImageUploadProps {
  className?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export function ImageUpload({ className, value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const preview = useMemo(() => (value ? URL.createObjectURL(value) : null), [value]);

  useEffect(() => {
    if (preview) return () => URL.revokeObjectURL(preview);
  }, [preview]);

  useEffect(() => {
    if (!value && inputRef.current) inputRef.current.value = '';
  }, [value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.files?.[0] ?? null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) onChange?.(file);
  }

  const hasImage = !!preview;

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-1 border-dashed transition-colors',
        isDragging ? 'border-sky-600 bg-sky-50' : 'border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100',
        hasImage && 'border-solid border-gray-200 bg-white p-0',
        className,
      )}
      onClick={() => !hasImage && inputRef.current?.click()}
      onDragOver={e => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {hasImage ? (
        <>
          <img className="absolute inset-0 h-full w-full rounded-lg object-cover" src={preview!} alt="Предпросмотр" />
          <CloseButton
            className="absolute top-2 right-2"
            variant="secondary"
            onClick={e => {
              e.stopPropagation();
              onChange?.(null);
            }}
            aria-label="Удалить фото"
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
            <ImageIcon className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500">
            Перетащите или <span className="font-medium text-sky-600">выберите файл</span>
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP до 10 МБ</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}
