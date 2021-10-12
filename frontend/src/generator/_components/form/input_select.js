import {useQuery} from '@apollo/client';
import Select from 'react-select';
import _ from 'lodash';

export default function InputSelect(props) {
  if (props.query) {
    return <InputSelectQuery {...props} />;
  } else {
    return <InputSelectOption {...props} />;
  }
}

function InputSelectQuery({query, variables, idKey, labelKey, ...props}) {
  const {data} = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    variables: variables,
  });

  if (!data) return <div>Loading</div>

  const options = [
    {value: '', label: '---'},
    ...data.data.map(item => ({value: item[idKey], label: item[labelKey]}))
  ];

  return (
    <InputSelectOption
      options={options}
      {...props}
    />
  );
}

function InputSelectOption({displayLabel, name, onValueChange, options, isMulti, ...props}) {
  return options ? (
    <div>
      <label
        className="text-gray-700 dark:text-gray-200"
        htmlFor={name}
      >
        {displayLabel}
      </label>
      <Select
        name={name}
        value={_.isArray(props.value) ? options.filter(v => props.value.find(value => value == v.value)) : options.find(v => v.value == props.value)}
        onChange={(v) => {
          if (onValueChange) {
            if (_.isArray(v)) {
              onValueChange(v.map(item => item.value));
            } else {
              onValueChange(v.value);
            }
          }
        }}
        options={options}
        defaultValue={options.find(v => v.value == props.defaultValue)}
        menuPortalTarget={document.body}
        isMulti={isMulti}
      />
    </div>
  ) : null;
}