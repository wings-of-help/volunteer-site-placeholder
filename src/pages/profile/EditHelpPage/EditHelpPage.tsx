import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getHelpById } from '../../../api/help.api';
import { HelpForm } from '../../../components/HelpForm/HelpForm';
import type { HelpRequest } from '../../../api/types/help';

interface Props {
  kind: 'request' | 'offer';
}

export const EditHelpPage = ({ kind }: Props) => {
  const { id } = useParams();
  const [data, setData] = useState<HelpRequest | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await getHelpById(Number(id));
      setData(res);
    };
    load();
  }, [id]);

  if (!data) return null;

  return (
    <HelpForm
      mode="edit"
      kind={kind}
      initialData={{
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
      }}
    />
  );
};
