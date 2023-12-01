import React from 'react';
import './TagInput.scss';

const TagInput = props => {
  const [tags, setTags] = React.useState([]);

  const addTags = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  return (
    <div className="TagInput">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={event => (event.key === 'Enter' ? props.addTags(event) : null)}
        placeholder={props.placeHolder}
      />
    </div>
  );
};

export default TagInput;
