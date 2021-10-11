import {useQuery} from '@apollo/client';
import Select from 'react-select';

function InputSelect({displayLabel, name, onValueChange, query, idKey, labelKey, ...props}) {
  const { loading, error, data, refetch } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  if (!data) return <div>Loading</div>

  const options = [
    {value: '---', label: '---'},
    ...data.data.map(item => ({value: item[idKey], label: item[labelKey]}))
  ];

  return data ? (
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">{displayLabel}</label>
      <Select
        name={name}
        value={options.find(v => v.value == props.value)}
        onChange={(v) => onValueChange(v.value)}
        options={options}
        menuPortalTarget={document.body}
      />
    </div>
  ) : null;
}

export default InputSelect;
