'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormGroup from '@/app/shared/form-group';
import { Input } from '@/components/ui/input';
import SelectBox from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import {
  JourneyFormInput,
  JourneyFormSchema,
} from '@/utils/validators/journey-form.schema';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  useCreateJourney,
  useUpdateJourney,
  useAllUserStore,
} from '@/framework/journeys';
import Spinner from '@/components/ui/spinner';
import { DatePicker } from '@/components/ui/datepicker';
import { formatDate } from '@/utils/format-date';
import { useAllFilter } from '@/framework/settings';
import CreatableSelect from 'react-select';

// main category form component for create and update category
export default function UpdateCreateJourney({
  initValues,
}: {
  initValues?: any;
}) {
  console.log(initValues);

  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { data: allUserStore, isLoading: isAllUserStoreLoading } =
    useAllUserStore();
  const { mutate: update } = useUpdateJourney();
  const { mutate: create, isPending } = useCreateJourney();
  const [forceUpdate, setForceUpdate] = useState(0);
  const { data: allFilters } = useAllFilter();
  const [retailerFilter, setRetailerFilter] = useState(
    allFilters?.data.retailers?.map((retailer: any) => ({
      name: retailer?.name,
      id: retailer?.id,
      ...retailer,
    }))
  );

  useEffect(() => {
    setRetailerFilter(
      allFilters?.data.retailers?.map((retailer: any) => ({
        name: retailer?.name,
        id: String(retailer?.id),
        ...retailer,
      }))
    );
  }, [allFilters]);
  const onSubmit: SubmitHandler<JourneyFormInput> = (data) => {
    if (initValues) {
      const formatedDate = formatDate(data?.date, 'YYYY-MM-DD');
      update({
        date: String(formatedDate) || initValues?.date,
        journey_id: initValues.id,
        user_id: data.user_id.value,
        store_id: data.store_id.value,
        priority: data.priority || initValues?.priority,
        shifts_count: data.shifts_count || initValues?.shifts_count,
        check_out: forceUpdate,
        // retailer_id: data.retailer_id || initValues?.retailer_id,
      });
    } else {
      const formatedDateFrom = formatDate(data?.date_from, 'YYYY-MM-DD');
      const formatedDateTo = formatDate(data?.date_to, 'YYYY-MM-DD');
      create({
        date_from: formatedDateFrom,
        date_to: formatedDateTo,
        user_id: data.user_id.value,
        store_id: data.store_id.value,
        priority: data.priority,
        shifts_count: data.shifts_count,
      });
    }
    setLoading(isPending);
    setReset({
      roleName: '',
    });
    // closeModal()
  };
  var today = new Date(),
    date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
  return (
    <>
      {isAllUserStoreLoading ? (
        <div className="m-auto">
          <Spinner size="lg" />
        </div>
      ) : (
        <Form<JourneyFormInput>
          resetValues={reset}
          onSubmit={onSubmit}
          validationSchema={JourneyFormSchema}
          useFormProps={{
            defaultValues: {
              //@ts-ignore
              user_id: initValues
                ? { value: initValues?.user_id, label: initValues?.user?.name }
                : '',
              //@ts-ignore
              store_id: initValues
                ? { value: initValues?.store_id, label: initValues?.store.name }
                : '',
              //@ts-ignore
              retailer_id: initValues
                ? {
                    value: initValues?.store.retailer_id,
                    label: retailerFilter?.find(
                      (r: any) => r.id == initValues?.store.retailer_id
                    )?.name,
                  }
                : '',
              priority: initValues?.priority
                ? String(initValues?.priority)
                : '',
              shifts_count: initValues?.shifts_count
                ? String(initValues?.shifts_count)
                : '',
              date: new Date(initValues?.date || date),
            },
          }}
          className="flex flex-grow flex-col gap-6 overflow-y-auto p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
          {({ register, control, watch, formState: { errors } }) => {
            console.log(errors);

            let retailerWatcher: any = watch('retailer_id');
            return (
              <>
                <div className="flex items-center justify-between">
                  <Title as="h4" className="font-semibold">
                    {initValues ? 'Update Journey' : 'Add a new Journey'}
                  </Title>
                  <ActionIcon size="sm" variant="text" onClick={closeModal}>
                    <PiXBold className="h-auto w-5" />
                  </ActionIcon>
                </div>
                {initValues?.status == 'pending' ? (
                  <>
                    <FormGroup
                      title="User"
                      className="@2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Controller
                        control={control}
                        name="user_id"
                        render={({ field: { value, onChange } }) => (
                          <CreatableSelect
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow: '',
                                borderColor: `${
                                  errors?.user_id?.message ? 'red' : 'none'
                                }`,
                              }),
                            }}
                            placeholder="Select User"
                            className="w-full pt-2"
                            closeMenuOnSelect={true}
                            options={allUserStore?.data?.users?.map(
                              (cat: any) => {
                                return { label: cat.name, value: cat.id };
                              }
                            )}
                            value={value}
                            onChange={onChange}
                          />
                          // <SelectBox
                          //     placeholder="Select User"
                          //     options={ allUserStore?.data?.users?.map((user: any) =>{ return {...user, value: user.name}})}
                          //     onChange={onChange}
                          //     value={value}
                          //     className="col-span-full"
                          //     getOptionValue={(option) => String(option.id)}
                          //     displayValue={(selected) =>
                          //         allUserStore?.data?.users?.find((r: any) => r.id == selected)?.name ?? 'Select User'
                          //     }
                          //     error={errors?.user_id?.message as string}
                          // />
                        )}
                      />
                      <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                        {errors?.user_id?.message ? 'required' : ''}
                      </span>
                    </FormGroup>

                    <FormGroup
                      title="Retailer"
                      className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Controller
                        control={control}
                        name="retailer_id"
                        render={({ field: { value, onChange } }) => (
                          <CreatableSelect
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow: '',
                                borderColor: `${
                                  errors?.retailer_id?.message ? 'red' : 'none'
                                }`,
                              }),
                            }}
                            placeholder="Select Retailer"
                            className="w-full pt-2"
                            closeMenuOnSelect={true}
                            options={retailerFilter?.map((cat: any) => {
                              return { ...cat, label: cat.name, value: cat.id };
                            })}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                        {errors?.retailer_id?.message ? 'required' : ''}
                      </span>
                    </FormGroup>
                    <FormGroup
                      title="Store"
                      className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Controller
                        control={control}
                        name="store_id"
                        render={({ field: { value, onChange } }) => (
                          <CreatableSelect
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow: '',
                                borderColor: `${
                                  errors?.retailer_id?.message ? 'red' : 'none'
                                }`,
                              }),
                            }}
                            placeholder="Select Retailer"
                            className="w-full pt-2"
                            closeMenuOnSelect={true}
                            options={retailerFilter
                              ?.find(
                                (item: any) =>
                                  item?.id == retailerWatcher?.value
                              )
                              ?.stores?.map((cat: any) => {
                                return {
                                  ...cat,
                                  label: cat.name,
                                  value: cat.id,
                                };
                              })}
                            value={value}
                            onChange={onChange}
                          />

                          // <SelectBox
                          //     placeholder="Select Store"
                          //     // @ts-ignore
                          //     options={ retailerFilter?.find((item: any) => item?.id == retailerWatcher)?.stores?.map((cat: any) =>{return {...cat, value: cat.name}})}
                          //     onChange={onChange}
                          //     value={value}
                          //     className="col-span-full"
                          //     getOptionValue={(option) => String(option.id)}
                          //     displayValue={(selected) =>
                          //         // @ts-ignore
                          //         retailerFilter?.find((cat: any) => cat?.id == retailerWatcher)?.stores?.find((r: any) => r.id == selected)?.name ?? "Select Store"
                          //     }
                          //     error={errors?.store_id?.message as string}
                          // />
                        )}
                      />
                      <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                        {errors?.store_id?.message ? 'required' : ''}
                      </span>
                    </FormGroup>

                    <Input
                      label="Priority"
                      placeholder="priority"
                      {...register('priority')}
                      error={errors.priority?.message}
                    />
                    <Input
                      label="work shift"
                      placeholder="work shift"
                      {...register('shifts_count')}
                      error={errors.shifts_count?.message}
                    />
                    {initValues && (
                      <div className="[&>.react-datepicker-wrapper]:w-full">
                        <Controller
                          name="date"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <DatePicker
                              inputProps={{ label: 'Date' }}
                              placeholderText="Select Date"
                              dateFormat="yyyy MM dd"
                              selected={value}
                              minDate={new Date()}
                              onChange={onChange}
                              showDisabledMonthNavigation
                            />
                          )}
                        />
                        {errors.date && (
                          <p className="cursor-default text-xs text-red-600">
                            {errors.date.message as string}
                          </p>
                        )}
                      </div>
                    )}

                    {!initValues && (
                      <div className="flex gap-3">
                        <div className="[&>.react-datepicker-wrapper]:w-full">
                          <Controller
                            name="date_from"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DatePicker
                                inputProps={{ label: 'Date From' }}
                                placeholderText="Select Date"
                                dateFormat="yyyy MM dd"
                                selected={value}
                                minDate={new Date()}
                                onChange={onChange}
                                showDisabledMonthNavigation
                              />
                            )}
                          />
                          {errors.date && (
                            <p className="cursor-default text-xs text-red-600">
                              {errors.date.message as string}
                            </p>
                          )}
                        </div>
                        <div className="[&>.react-datepicker-wrapper]:w-full">
                          <Controller
                            name="date_to"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DatePicker
                                inputProps={{ label: 'Date To' }}
                                placeholderText="Select Date"
                                dateFormat="yyyy MM dd"
                                selected={value}
                                minDate={new Date()}
                                onChange={onChange}
                                showDisabledMonthNavigation
                              />
                            )}
                          />
                          {errors.date && (
                            <p className="cursor-default text-xs text-red-600">
                              {errors.date.message as string}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  ''
                )}
                {initValues ? (
                  ''
                ) : (
                  <>
                    <FormGroup
                      title="User"
                      className="@2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Controller
                        control={control}
                        name="user_id"
                        render={({ field: { value, onChange } }) => (
                          <CreatableSelect
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow: '',
                                borderColor: `${
                                  errors?.user_id?.message ? 'red' : 'none'
                                }`,
                              }),
                            }}
                            placeholder="Select User"
                            className="w-full pt-2"
                            closeMenuOnSelect={true}
                            options={allUserStore?.data?.users?.map(
                              (cat: any) => {
                                return { label: cat.name, value: cat.id };
                              }
                            )}
                            value={value}
                            onChange={onChange}
                          />
                          // <SelectBox
                          //     placeholder="Select User"
                          //     options={ allUserStore?.data?.users?.map((user: any) =>{ return {...user, value: user.name}})}
                          //     onChange={onChange}
                          //     value={value}
                          //     className="col-span-full"
                          //     getOptionValue={(option) => String(option.id)}
                          //     displayValue={(selected) =>
                          //         allUserStore?.data?.users?.find((r: any) => r.id == selected)?.name ?? 'Select User'
                          //     }
                          //     error={errors?.user_id?.message as string}
                          // />
                        )}
                      />
                      <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                        {errors?.user_id?.message ? 'required' : ''}
                      </span>
                    </FormGroup>

                    <FormGroup
                      title="Retailer"
                      className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Controller
                        control={control}
                        name="retailer_id"
                        render={({ field: { value, onChange } }) => (
                          <CreatableSelect
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow: '',
                                borderColor: `${
                                  errors?.retailer_id?.message ? 'red' : 'none'
                                }`,
                              }),
                            }}
                            placeholder="Select Retailer"
                            className="w-full pt-2"
                            closeMenuOnSelect={true}
                            options={retailerFilter?.map((cat: any) => {
                              return { ...cat, label: cat.name, value: cat.id };
                            })}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                        {errors?.retailer_id?.message ? 'required' : ''}
                      </span>
                    </FormGroup>
                    <FormGroup
                      title="Store"
                      className=" @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Controller
                        control={control}
                        name="store_id"
                        render={({ field: { value, onChange } }) => (
                          <CreatableSelect
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow: '',
                                borderColor: `${
                                  errors?.retailer_id?.message ? 'red' : 'none'
                                }`,
                              }),
                            }}
                            placeholder="Select Retailer"
                            className="w-full pt-2"
                            closeMenuOnSelect={true}
                            options={retailerFilter
                              ?.find(
                                (item: any) =>
                                  item?.id == retailerWatcher?.value
                              )
                              ?.stores?.map((cat: any) => {
                                return {
                                  ...cat,
                                  label: cat.name,
                                  value: cat.id,
                                };
                              })}
                            value={value}
                            onChange={onChange}
                          />

                          // <SelectBox
                          //     placeholder="Select Store"
                          //     // @ts-ignore
                          //     options={ retailerFilter?.find((item: any) => item?.id == retailerWatcher)?.stores?.map((cat: any) =>{return {...cat, value: cat.name}})}
                          //     onChange={onChange}
                          //     value={value}
                          //     className="col-span-full"
                          //     getOptionValue={(option) => String(option.id)}
                          //     displayValue={(selected) =>
                          //         // @ts-ignore
                          //         retailerFilter?.find((cat: any) => cat?.id == retailerWatcher)?.stores?.find((r: any) => r.id == selected)?.name ?? "Select Store"
                          //     }
                          //     error={errors?.store_id?.message as string}
                          // />
                        )}
                      />
                      <span className="rizzui-input-error-text mt-0.5 text-xs text-red">
                        {errors?.store_id?.message ? 'required' : ''}
                      </span>
                    </FormGroup>

                    <Input
                      label="Priority"
                      placeholder="priority"
                      {...register('priority')}
                      error={errors.priority?.message}
                    />
                    <Input
                      label="work shift"
                      placeholder="work shift"
                      {...register('shifts_count')}
                      error={errors.priority?.message}
                    />
                    {initValues && (
                      <div className="[&>.react-datepicker-wrapper]:w-full">
                        <Controller
                          name="date"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <DatePicker
                              inputProps={{ label: 'Date' }}
                              placeholderText="Select Date"
                              dateFormat="yyyy MM dd"
                              selected={value}
                              minDate={new Date()}
                              onChange={onChange}
                              showDisabledMonthNavigation
                            />
                          )}
                        />
                        {errors.date && (
                          <p className="cursor-default text-xs text-red-600">
                            {errors.date.message as string}
                          </p>
                        )}
                      </div>
                    )}

                    {!initValues && (
                      <div className="flex gap-3">
                        <div className="[&>.react-datepicker-wrapper]:w-full">
                          <Controller
                            name="date_from"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DatePicker
                                inputProps={{ label: 'Date From' }}
                                placeholderText="Select Date"
                                dateFormat="yyyy MM dd"
                                selected={value}
                                minDate={new Date()}
                                onChange={onChange}
                                showDisabledMonthNavigation
                              />
                            )}
                          />
                          {errors.date && (
                            <p className="cursor-default text-xs text-red-600">
                              {errors.date.message as string}
                            </p>
                          )}
                        </div>
                        <div className="[&>.react-datepicker-wrapper]:w-full">
                          <Controller
                            name="date_to"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DatePicker
                                inputProps={{ label: 'Date To' }}
                                placeholderText="Select Date"
                                dateFormat="yyyy MM dd"
                                selected={value}
                                minDate={new Date()}
                                onChange={onChange}
                                showDisabledMonthNavigation
                              />
                            )}
                          />
                          {errors.date && (
                            <p className="cursor-default text-xs text-red-600">
                              {errors.date.message as string}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {initValues ? (
                  <div>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value={forceUpdate}
                      onChange={(event) => {
                        console.log(forceUpdate);
                        if (forceUpdate == 0) {
                          setForceUpdate(1);
                        } else {
                          setForceUpdate(0);
                        }
                      }}
                    />
                    <label htmlFor="vehicle1" className="ps-5">
                      Force Check Out
                    </label>
                  </div>
                ) : (
                  ''
                )}

                <br />

                <div className="flex items-center justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={closeModal}
                    className="w-full @xl:w-auto"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full @xl:w-auto"
                  >
                    {initValues ? 'Update Journey' : 'Create Journey'}
                  </Button>
                </div>
              </>
            );
          }}
        </Form>
      )}
    </>
  );
}
