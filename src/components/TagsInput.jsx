import React from "react";
import styles from "./TagsInput.module.css";

const tagsData = [
  { id: 1, name: "Javascript" },
  { id: 2, name: "React" },
  { id: 3, name: "Redux" },
  { id: 4, name: "Node" },
  { id: 5, name: "Express" },
  { id: 6, name: "MongoDB" },
  { id: 7, name: "Mongoose" },
  { id: 8, name: "HTML" },
  { id: 9, name: "CSS" },
  { id: 10, name: "Bootstrap" },
  { id: 11, name: "Material UI" },
  { id: 12, name: "SASS" },
  { id: 13, name: "Jest" },
  { id: 14, name: "Php" },
  { id: 15, name: "Java" },
  { id: 16, name: "Laravel" },
  { id: 17, name: "Vue Js " },
  { id: 18, name: "Angular " }
];

let filterTimeout;
export default function TagsInput() {
  const [tags, setTags] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);

  // use ref
  const inputRef = React.useRef();

  const handleChange = (e) => {
    const value = e.target.value;
    clearTimeout(filterTimeout);

    if (value.length > 0) {
      filterTimeout = setTimeout(() => {
        const filteredSuggestions = tagsData.filter((tag) =>
          tag.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        console.log(value);
      }, 1000);
    } else {
      setSuggestions([]);
    }
  };

  const handleDelete = (id) => {
    setTags(tags.filter((tag, index) => index !== id));
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
    setSuggestions([]);
    inputRef.current.value = "";
  };
  return (
    <>
      <label htmlFor="tagInput" className={styles.tagsInputContainer}>
        {tags.map((tag, i) => (
          <div className={styles.tagItem} key={i}>
            <span className={styles.text}>{tag}</span>
            <span
              className={styles.close}
              onClick={() => {
                handleDelete(i);
              }}
            >
              &times;
            </span>
          </div>
        ))}

        <input
          className={styles.input}
          id="tagInput"
          ref={inputRef}
          type="text"
          placeholder="Your Skills"
          onChange={handleChange}
        />
      </label>
      {suggestions.length > 0 && (
        <div className={styles.suggestionsContainer}>
          {suggestions.map((suggestion) => (
            <div className={styles.suggestionItem} key={suggestion.id}>
              <span className={styles.text}>{suggestion.name}</span>

              <span
                className={styles.close}
                onClick={() => handleAdd(suggestion.name)}
              >
                +
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
