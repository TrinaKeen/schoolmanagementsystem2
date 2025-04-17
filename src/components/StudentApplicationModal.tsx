import { useDisclosure } from '@mantine/hooks';
import FormModal from './FormModal';

const StudentApplicationModal = ({ type, data, id }: { type: 'create' | 'update' | 'delete', data?: any, id?: number }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const fields = [
    { name: 'studentId', label: 'Student ID', required: true },
    { name: 'programId', label: 'Program ID', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Accepted', value: 'accepted' },
      { label: 'Rejected', value: 'rejected' }
    ] },
    { name: 'submittedAt', label: 'Submitted At', type: 'text', required: true },
  ];

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (type === 'create') {
        await fetch('/api/studentApplicationStatus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
      } else if (type === 'update') {
        await fetch(`/api/studentApplicationStatus/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
      } else if (type === 'delete') {
        await fetch(`/api/studentApplicationStatus/${id}`, {
          method: 'DELETE',
        });
      }
      close();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <>
      <button
        onClick={open}
        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
      >
        {type === 'create' ? 'Add' : type === 'update' ? 'Edit' : 'Delete'}
      </button>

      {type !== 'delete' && (
        <FormModal
          opened={opened}
          onClose={close}
          onSubmit={handleSubmit}
          fields={fields}
          title={`${type === 'update' ? 'Update' : 'Create'} Student Application`}
          initialValues={data}
        />
      )}
    </>
  );
};

export default StudentApplicationModal;
