import { useState, ChangeEvent } from "react";
import AddressSearchComponent from "./AddressSearchComponent";

const AddressSearch = () => {
  const [inputText, setInputText] = useState("");
  const [enableDelete, setDelete] = useState(true);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("aaa");
    setInputText(e.target.value);
    console.log(e.target.value);
    setDelete(e.target.value.length !== 0);
  };

  return (
    <AddressSearchComponent
      inputText={inputText}
      onInput={onInput}
      enableDelete={enableDelete}
      nextMode={2}
    />
  );
};

export default AddressSearch;
