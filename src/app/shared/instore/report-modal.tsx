'use client';

import { PiXBold } from 'react-icons/pi';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import Image from 'next/image';
import AvatarCard from '@/components/ui/avatar-card';
import { useIeaModal } from '@/framework/instore';


// main category form component for create and update category
export default function IeaModale({ id }: {
    id: number
}) {
  const { closeModal } = useModal();
  const { data, isLoading: isReportLoading } = useIeaModal(id)
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{src: string, type: string}>();
  function handleTabClick(src: string, type: string) {
    setOpen(() => true);
    setModalData({src: src, type: type})
    // setActive(() => id);
  }

  return (
    <>
    {isReportLoading ? (
        <div className="m-auto">
            <Spinner size="lg" />
        </div>
    ) : (
        <>
            <div className='flex flex-grow flex-col gap-2 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900'>
                <div className="flex items-center justify-between">
                    <Title as="h4" className="font-semibold">
                        {'Instore Promotion Model Details'}
                    </Title>
                    <ActionIcon size="sm" variant="text" onClick={closeModal}>
                        <PiXBold className="h-auto w-5" />
                    </ActionIcon>
                </div>
                <div className='grid grid-cols-2 gap-x-4'>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Region
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.store?.region?.name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        City
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.store?.city?.name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Retailer
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.store?.retailer?.name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Brand
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.brand?.name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        BG
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.category?.name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        VCP
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.sub_category?.name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        BU
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.sub_sub_category?.name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Model Name
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.model_name}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        sku_code
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.sku_code}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Availability Date
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        <DateCell date={data?.data?.in_store_date_from} />
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Regular Price
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.price}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Promotion Price
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.promotion_price}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Promotion Amount
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.promotion_amount}
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Promotion Percentatge
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.promotion_percentage}%
                        </Text>
                    </div>
                    <div>
                        <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                        Comment
                        </Title>
                        <Text as="p" className="pb-2 leading-relaxed">
                        {data?.data?.comment}
                        </Text>
                    </div>
                    {data?.data?.Photos && data?.data?.Photos?.length > 0 ? 
                    data?.data?.Photos?.map((photo: any, index: number) => (
                        <div key={index}>
                            <Title as="h6" className="mt-4 font-inter text-sm font-semibold">
                            Photos
                            </Title>
                            <button onClick={() => handleTabClick(photo?.path, 'image')}>
                            <AvatarCard
                                src={photo?.path}
                                name={''}
                                // description={`ID-${row?.user.id}`}
                            />
                            </button>
                        </div>
                    )) : null }
                    {data?.data?.videos && data?.data?.videos?.length > 0 ? 
                    data?.data?.videos?.map((photo: any, index: number) => (
                        <div key={index}>
                            <Title as="h6" className="mt-6 font-inter text-sm font-semibold">
                            Videos
                            </Title>
                            <button onClick={() => handleTabClick(photo?.path, 'video')}>
                            <AvatarCard
                                src={photo?.path}
                                name={''}
                                // description={`ID-${row?.user.id}`}
                            />
                            </button>
                        </div>
                    )) : null }
                </div>
            </div>
            <Modal
            isOpen={open}
            onClose={() => {
            setOpen(false);
            //   setActive(() => 'posts');
            }}
            overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
            containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
        >
            <div className="flex items-center justify-between pb-2 lg:pb-3">
            {/* <Title
                as="h3"
                className="text-lg font-semibold text-gray-900 xl:text-xl"
            >
                {'modalData.title'}
            </Title> */}
            <Button
                variant="text"
                onClick={() => {
                setOpen(false);
                //   setActive(() => 'posts');
                }}
                className="h-auto px-1 py-1"
            >
                <PiXBold className="h-5 w-5 text-base" />
            </Button>
            </div>
            {modalData && modalData?.type == 'image' ?
                <div className='flex w-full justify-around'>
                    <Image src={modalData?.src || ''} width={300} height={400} alt={'test'} />
                </div> : 
                <div>
                    <video autoPlay loop style={{ width: '400px', height: '400px' }}>
                        <source src={modalData?.src} />
                    </video>
                </div>
                }
            </Modal>
        </>
    )}
    </>   
  );
}
