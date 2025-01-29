'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import {
  useCreateCategory,
  useUpdateCategory,
} from '@/framework/features-categories';
import {
  FeaturesFormInput,
  FeaturesFormSchema,
} from '@/utils/validators/featurescat-form.schema';
import StatusField from '@/components/controlled-table/status-field';
import { useAllFilter } from '@/framework/settings';
import { useMedia } from 'react-use';
import FormGroup from '../form-group';
import SelectBox from '@/components/ui/select';
import {
  useMainCategories,
  useParentMainCategories,
  useSupSupCategories,
} from '@/framework/maincategories ';
import { string } from 'zod';
import CreatableSelect from 'react-select';

// main category form component for create and update category
export default function UpdateCreateCategory({
  text,
  initValues,
}: {
  text?: any;
  initValues?: any;
}) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { mutate: update } = useUpdateCategory();
  const { mutate: create, isPending } = useCreateCategory();
  const { data: allFilters } = useAllFilter();
  const [categoriesFilter, setCategoriesFilter] = useState<
    { id: number; name: string; children: any }[] | []
  >(allFilters?.data.categories);
  const [isActive, setIsActive] = useState<number>(
    initValues ? initValues?.is_active : 1
  );
  const [lang, setLang] = useState('en');
  const [nameEn, setNameEn] = useState(initValues ? initValues?.en_name : '');
  const [nameAr, setNameAr] = useState(initValues ? initValues?.ar_name : '');
  useEffect(() => {
    setCategoriesFilter(allFilters?.data.categories);
  }, [allFilters]);

  const onSubmit: SubmitHandler<FeaturesFormInput> = (data) => {
    const formatedName = JSON.stringify({
      en: lang == 'en' ? data.name : nameEn,
      ar: lang == 'en' ? nameAr : data.name,
    });
    if (initValues) {
      update({
        category_id: initValues?.id,
        is_active: isActive,
        name: formatedName,
        level_id: data?.level_id.value,
      });
    } else {
      create({
        ...data,
        name: formatedName,
        is_active: isActive,
        level_id: data?.level_id.value,
      });
    }
    setLoading(isPending);
    setReset({
      roleName: '',
    });
    // closeModal()
  };

  return (
    <Form<FeaturesFormInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={FeaturesFormSchema}
      useFormProps={{
        defaultValues: {
          name: initValues?.name || '',
          //@ts-ignore
          level_id: initValues
            ? {
                value: initValues?.level_id,
                label: allFilters?.data.levels?.find(
                  (r: any) => r.id === initValues?.level_id
                )?.name,
              }
            : '',
        },
      }}
      className="flex flex-grow flex-col gap-6 overflow-y-auto p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({
        register,
        getValues,
        setValue,
        control,
        watch,
        formState: { errors },
      }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {initValues ? 'Update Category' : 'Add a new Category'}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="flex flex-wrap gap-3 px-1">
              <Checkbox
                key={0}
                label={text.features_cat.english}
                checked={lang == 'en'}
                onChange={function () {
                  if (lang == 'en') return;
                  const currentName = getValues('name');
                  setNameAr(currentName);
                  setValue('name', nameEn == '' ? '' : nameEn);
                  setLang(lang == 'en' ? 'ar' : 'en');
                }}
              />
              <Checkbox
                key={1}
                label={text.features_cat.arabic}
                checked={lang == 'ar'}
                onChange={function () {
                  if (lang == 'ar') return;
                  const currentName = getValues('name');
                  setNameEn(currentName);
                  setValue('name', nameAr == '' ? '' : nameAr);
                  setLang(lang == 'en' ? 'ar' : 'en');
                }}
              />
            </div>

            <FormGroup title={text.features_cat.level} className="w-1/2 pt-2">
              <Controller
                control={control}
                name="level_id"
                render={({ field: { value, onChange } }) => (
                  <CreatableSelect
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        boxShadow: '',
                        borderColor: `${
                          errors?.level_id?.message ? 'red' : 'none'
                        }`,
                      }),
                    }}
                    placeholder={text.features_cat.level}
                    className="w-full pt-2"
                    closeMenuOnSelect={true}
                    options={allFilters?.data.levels.map((cat: any) => {
                      return { label: cat.name, value: cat.id };
                    })}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                {errors?.level_id?.message ? 'is Required' : ''}
              </span>
            </FormGroup>
            <Input
              label={text.features_cat.cat_name}
              placeholder={text.features_cat.cat_name}
              {...register('name')}
              error={errors.name?.message}
            />

            <div className="flex flex-wrap gap-3 px-1">
              <Checkbox
                key={1}
                label={text.features_cat.act}
                checked={isActive == 1}
                // value={permission.id}
                onChange={() => setIsActive(isActive ? 0 : 1)}
              />
              <Checkbox
                key={0}
                label={text.features_cat.Inactive}
                checked={isActive == 0}
                // value={permission.id}
                onChange={() => setIsActive(isActive ? 0 : 1)}
              />
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                {text.features_cat.cancel}
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                {initValues ? text.features_cat.update: text.features_cat.cear}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
