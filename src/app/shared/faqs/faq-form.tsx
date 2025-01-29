'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/text';
import {
  FaqFormInput,
  FaqFormSchema,
} from '@/utils/validators/faq-form.schema';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { PiXBold } from 'react-icons/pi';

import { useCreateFaqs, useUpdateFaqs } from '@/framework/faqs';
import DOMPurify from 'isomorphic-dompurify';

import QuillLoader from '@/components/loader/quill-loader';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function UpdateCreateBrand({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const { mutate: update } = useUpdateFaqs();
  const { mutate: create, isPending } = useCreateFaqs();

  const onSubmit: SubmitHandler<FaqFormInput> = (data) => {
    if (initValues) {
      update({
        ...data,
        id: initValues.id,
      });
    } else {
      create(data);
    }
    setReset({
      roleName: '',
    });

    closeModal();
  };

  return (
    <>
      <Form<FaqFormInput>
        resetValues={reset}
        onSubmit={onSubmit}
        validationSchema={FaqFormSchema}
        useFormProps={{
          defaultValues: initValues,
        }}
        className="flex flex-grow flex-col gap-6 overflow-y-auto p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      >
        {({
          register,
          getValues,
          control,
          setValue,
          formState: { errors, isLoading },
        }) => {
          return (
            <>
              <div className="flex items-center justify-between">
                <Title as="h4" className="font-semibold">
                  {initValues ? 'Update Faq' : 'Add a new Faq'}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
              </div>

              <Input
                label={'Question EN'}
                placeholder={'Question EN'}
                {...register('title_question.en')}
                error={errors.title_question?.en?.message}
              />
              <Input
                label={'Question AR'}
                placeholder={'Question AR'}
                {...register('title_question.ar')}
                error={errors.title_question?.ar?.message}
              />

              <Controller
                control={control}
                name="answer.en"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    value={DOMPurify.sanitize(value || '')}
                    onChange={onChange}
                    label="Answer EN"
                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
              <Controller
                control={control}
                name="answer.ar"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    value={DOMPurify.sanitize(value || '')}
                    onChange={onChange}
                    label="Answer"
                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />

              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="w-full @xl:w-auto"
                >
                  {'Cancel'}
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto"
                >
                  {initValues ? 'Update Faq' : 'Create Faq'}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
