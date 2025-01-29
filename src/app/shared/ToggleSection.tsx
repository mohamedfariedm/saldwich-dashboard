import { Checkbox, Input } from 'rizzui';
import FormGroup from './form-group';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useEditSection } from '@/framework/attachments';
function ToggleSection({
  page_id,
  section_id,
  active,
  priority
}: {
  page_id: number;
  section_id: string;
  active: number;
  priority:number
}) {
  const { mutate: update, isPending } = useEditSection();
  const [activation, setActivation] = useState<number>(active);
  const[sectionPeriorty,setSectionPeriorty]=useState<string>(String(priority));
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    
    update({
      section_id,
      page_id,
      active: activation,
      priority:Number(sectionPeriorty)
    });
  };
  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="flex w-full flex-col items-start  justify-between gap-7 border-b border-gray-200 pb-5 sm:flex-row sm:items-center"
    >
      <div className="flex items-center  justify-around">
        <p className='text-sm font-semibold me-5'>Priority</p>
                  <Input
                    type="number"
                    className="col-span-full"
                    placeholder="Priority"
                    name='priority'
                    onChange={(e)=>{
                        console.log(e.target.value);
                        setSectionPeriorty(e.target.value)
                    }}
                    value={sectionPeriorty}
                  />
      </div>{' '}
      <div className="flex flex-wrap gap-3 px-1">
        <Checkbox
          key={1}
          label={'Active'}
          checked={activation == 1}
          onChange={() => setActivation(activation ? 0 : 1)}
        />
        <Checkbox
          key={0}
          label={'Not Active'}
          checked={activation == 0}
          onChange={() => setActivation(activation ? 0 : 1)}
        />
      </div>{' '}
      <Button
        isLoading={isPending}
        type="submit"
        variant="solid"
        className="dark:bg-gray-100 dark:text-white"
      >
        Update
      </Button>
    </form>
  );
}
export default ToggleSection;
